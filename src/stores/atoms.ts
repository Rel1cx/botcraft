import { Option as O } from "@swan-io/boxed"
import { produce } from "immer"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { omit } from "rambda"
import toast from "react-hot-toast"
import { animationFrameScheduler, concatMap, observeOn, timeout } from "rxjs"
import { stringify } from "telejson"
import invariant from "tiny-invariant"

import { generateChatCompletionStream, initChat } from "@/bots/builtins/chatgpt"
import type { MessageData } from "@/bots/builtins/types"
import { DEFAULT_API_ENDPOINT } from "@/constants"
import { localStorageGetItem } from "@/lib/browser"
import { uid } from "@/lib/uuid"
import type { ChatCompletionTask, ChatCompletionTaskMeta, ChatItem } from "@/types"
import type { ChatID, MessageID } from "@/zod/id"
import { makeMessageID } from "@/zod/id"

import { botsDb, chatsDb, messagesDb } from "./db"

export const apiKeyAtom = atomWithStorage("API_KEY", localStorageGetItem("API_KEY", ""))

export const endpointAtom = atomWithStorage("ENDPOINT", localStorageGetItem("ENDPOINT", DEFAULT_API_ENDPOINT))

export const botsMetaAtom = atom((get) => {
    const bots = get(botsDb.values)
    return bots.map((bot) => ({
        id: bot.name,
        title: bot.name,
        icon: bot.icon,
    }))
})

export const addChatAtom = atom(null, async (get, set, botName: string) => {
    const bot = get(botsDb.item(botName))
    invariant(bot, `Bot ${botName} not found`)
    const newChat = initChat()(bot)
    const chat = {
        ...omit(["content"], newChat),
        messages: [],
    }

    await set(
        messagesDb.setMany,
        newChat.content.map<[string, MessageData]>((message) => [message.id, message]),
    )

    await set(chatsDb.set, chat.id, chat)

    await set(botsDb.set, botName, (prev) => {
        invariant(prev, `Bot ${botName} not found`)
        return {
            ...prev,
            chats: [...prev.chats, chat.id],
        }
    })
})

export const removeChatAtom = atom(null, async (get, set, botName: string, id: ChatID) => {
    const bot = get(botsDb.item(botName))
    invariant(bot, `Bot ${botName} not found`)
    const isLastChat = bot.chats.length === 1

    await set(botsDb.set, botName, (prev) => {
        invariant(prev, `Bot ${botName} not found`)
        return {
            ...prev,
            chats: prev.chats.filter((chatID) => chatID !== id),
        }
    })

    await set(chatsDb.delete, id)

    if (isLastChat) {
        await set(addChatAtom, botName)
    }
})

export const addMessageAtom = atom(null, async (get, set, id: ChatID, data: MessageData) => {
    const chat = get(chatsDb.item(id))
    invariant(chat, `Chat ${id} not found`)
    await set(messagesDb.set, data.id, data)
    await set(
        chatsDb.set,
        id,
        produce((draft: ChatItem) => {
            draft.messages.push(data.id)
            draft.updatedAt = Date.now()
        })(chat),
    )
})

export const removeMessageAtom = atom(null, async (get, set, chatID: ChatID, id: MessageID) => {
    const chat = get(chatsDb.item(chatID))
    invariant(chat, `Chat ${chatID} not found`)
    await set(
        chatsDb.set,
        chatID,
        produce((draft: ChatItem) => {
            draft.messages = draft.messages.filter((messageID) => messageID !== id)
            draft.updatedAt = Date.now()
        })(chat),
    )

    await set(messagesDb.delete, id)
})

export const updateMessageAtom = atom(
    null,
    async (get, set, chatID: ChatID, messageID: MessageID, data: MessageData) => {
        const chat = get(chatsDb.item(chatID))
        invariant(chat, `Chat ${chatID} not found`)
        const message = get(messagesDb.item(messageID))
        invariant(message, `Message ${messageID} not found`)
        await set(messagesDb.set, messageID, data)
    },
)

export const chatCompletionTaskAtom = atom(O.None<ChatCompletionTask>())

export const requestChatCompletionAtom = atom(null, async (get, set, botName: string, id: ChatID) => {
    const apiKey = get(apiKeyAtom)

    const endpoint = get(endpointAtom)

    const bot = get(botsDb.item(botName))

    invariant(bot, `Bot ${botName} not found`)

    const chat = get(chatsDb.item(id))

    invariant(chat, `Chat ${id} not found`)

    const messagesLoaded = await Promise.all(chat.messages.map((id) => get(messagesDb.item(id))))

    const messages = messagesLoaded.filter(Boolean)

    const abortController = new AbortController()

    const taskMeta: ChatCompletionTaskMeta = {
        id: uid.seq(),
        chatID: id,
        generatingMessageID: makeMessageID(),
    }

    set(
        chatCompletionTaskAtom,
        O.Some<ChatCompletionTask>({
            ...taskMeta,
            type: "pending",
            content: "",
            abort: () => {
                abortController.abort()
            },
        }),
    )

    const handleError = (err: unknown) => {
        const error = err instanceof Error ? err : new Error(stringify(err))

        toast.error(`Failed to generate chat completion: Error: ${error.name}\nMessage: ${error.message}`)

        set(
            chatCompletionTaskAtom,
            O.Some<ChatCompletionTask>({
                ...taskMeta,
                type: "error",
                content: "",
                error,
            }),
        )
    }

    const result = await generateChatCompletionStream(
        apiKey,
        endpoint,
        {
            ...omit(["messages"], chat),
            content: messages,
        },
        abortController.signal,
    )(bot)

    if (!result.isOk()) {
        const error = result.getError()
        handleError(error)
        return
    }

    const message: MessageData = {
        id: taskMeta.generatingMessageID,
        content: "",
        role: "assistant",
        updatedAt: Date.now(),
    }

    await set(addMessageAtom, id, message)

    const stream = result.get()

    stream
        .pipe(
            timeout(10000),
            observeOn(animationFrameScheduler),
            concatMap(async (msg) => {
                await set(messagesDb.set, taskMeta.generatingMessageID, (prev) => {
                    invariant(prev, `Message ${taskMeta.generatingMessageID} not found`)
                    return {
                        ...prev,
                        content: prev.content + msg,
                    }
                })
            }),
        )
        .subscribe({
            error: (err: unknown) => {
                handleError(err)
            },
            complete() {
                set(chatCompletionTaskAtom, O.Some<ChatCompletionTask>({ ...taskMeta, type: "done", content: "" }))
            },
        })
})
