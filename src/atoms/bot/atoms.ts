import { Option as O } from "@swan-io/boxed"
import { produce } from "immer"
import { atom } from "jotai"
import { omit, pick, sortBy } from "rambda"
import toast from "react-hot-toast"
import { stringify } from "telejson"
import invariant from "tiny-invariant"

import { generateChatCompletionStream } from "@/bots/builtins/ChatGPT"
import type { ChatData, MessageData } from "@/bots/builtins/types"
import { uid } from "@/lib/uuid"
import type { ChatID, MessageID } from "@/zod/id"
import { makeMessageID } from "@/zod/id"

import { apiKeyAtom, botsAtom, endpointAtom } from "../app/atoms"
import { chatsDb, messagesDb } from "../db"
import type { ChatCompletionTask, ChatCompletionTaskMeta, ChatItem, ChatMeta } from "./types"

export const chatMetaAtom = atom((get) => {
    return get(chatsDb.values).reduceRight<ChatMeta[]>((acc, item) => {
        const title = item.title === "" ? "Untitled" : item.title
        acc.push({
            title,
            ...pick(["id", "updatedAt"], item),
        })
        return acc
    }, [])
})

export const messageMetaAtom = atom((get) => {
    return get(messagesDb.values).map(pick(["id", "Role", "updatedAt"]))
})

export const sortedChatsAtom = atom((get) => {
    return sortBy((chat) => -chat.updatedAt, get(chatMetaAtom))
})

export const addChatAtom = atom(null, async (_, set, botName: string, payload: ChatData) => {
    const chat = {
        ...omit(["content"], payload),
        messages: [],
    }

    set(botsAtom, (draft) => {
        const bot = draft.find((bot) => bot.name === botName)
        invariant(bot, `Bot ${botName} not found`)
        bot.chats.push(chat.id)
    })

    await set(
        messagesDb.setMany,
        payload.content.map<[string, MessageData]>((message) => [message.id, message]),
    )

    await set(chatsDb.set, chat.id, chat)
})

export const removeChatAtom = atom(null, async (_, set, botName: string, id: ChatID) => {
    set(botsAtom, (draft) => {
        const bot = draft.find((bot) => bot.name === botName)
        invariant(bot, `Bot ${botName} not found`)
        bot.chats = bot.chats.filter((chatID) => chatID !== id)
    })
    await set(chatsDb.delete, id)
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

export const removeMessageAtom = atom(null, async (_, set, chatID: ChatID, id: MessageID) => {
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
        // await set(
        //     updateChatAtom,
        //     chatID,
        //     produce((draft) => {
        //         draft.updatedAt = Date.now()
        //     }),
        // )
    },
)

export const chatCompletionTaskAtom = atom(O.None<ChatCompletionTask>())

export const requestChatCompletionAtom = atom(null, async (get, set, botName: string, id: ChatID) => {
    const apiKey = get(apiKeyAtom)

    const endpoint = get(endpointAtom)

    const bots = get(botsAtom)

    const bot = bots.find((bot) => bot.name === botName)

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

    // eslint-disable-next-line functional/no-let
    let message: MessageData = {
        id: taskMeta.generatingMessageID,
        content: "",
        role: "assistant",
        updatedAt: Date.now(),
    }

    await set(addMessageAtom, id, message)

    const stream = result.get()

    stream.subscribe({
        next(msg) {
            message = produce(message, (draft) => {
                draft.content += msg
            })
            void set(updateMessageAtom, id, taskMeta.generatingMessageID, message)
        },
        error: (err: unknown) => {
            handleError(err)
        },
        complete() {
            set(chatCompletionTaskAtom, O.Some<ChatCompletionTask>({ ...taskMeta, type: "done", content: "" }))
        },
    })
})
