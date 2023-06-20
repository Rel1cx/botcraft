import { Option as O } from "@swan-io/boxed"
import { produce } from "immer"
import { atom } from "jotai"
import { omit, pick, sortBy } from "rambda"
import toast from "react-hot-toast"
import invariant from "tiny-invariant"

import { generateChatCompletionStream } from "@/bots/builtins/ChatGPT"
import type { ChatData, MessageData } from "@/bots/builtins/types"
import { stringify } from "@/lib/json"
import { uid } from "@/lib/uuid"
import type { ChatID, MessageID } from "@/zod/id"
import { makeMessageID } from "@/zod/id"

import { botsAtom } from "../app/atoms"
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

export const addChatAtom = atom(null, async (get, set, payload: ChatData) => {
    const chat = {
        ...omit(["content"], payload),
        messages: [],
    }

    await set(
        messagesDb.setMany,
        payload.content.map<[string, MessageData]>((message) => [message.id, message]),
    )

    await set(chatsDb.set, chat.id, chat)
})

export const removeChatAtom = atom(null, async (get, set, id: ChatID) => {
    await set(chatsDb.delete, id)
})

export const updateChatAtom = atom(null, async (get, set, id: ChatID, updateChat: (data: ChatItem) => ChatItem) => {
    const chat = get(chatsDb.item(id))
    invariant(chat, `Chat ${id} not found`)
    await set(chatsDb.set, id, updateChat(chat))
})

export const addMessageAtom = atom(null, async (get, set, id: ChatID, data: MessageData) => {
    const chat = get(chatsDb.item(id))
    invariant(chat, `Chat ${id} not found`)
    await set(messagesDb.set, data.id, data)
    await set(
        updateChatAtom,
        id,
        produce((draft) => {
            draft.messages.push(data.id)
        }),
    )
})

export const removeMessageAtom = atom(null, async (get, set, chatID: ChatID, id: MessageID) => {
    await set(messagesDb.delete, id)
})

export const updateMessageAtom = atom(
    null,
    async (get, set, chatID: ChatID, messageID: MessageID, updateMessage: (data: MessageData) => MessageData) => {
        const chat = get(chatsDb.item(chatID))
        invariant(chat, `Chat ${chatID} not found`)
        const message = get(messagesDb.item(messageID))
        invariant(message, `Message ${messageID} not found`)
        await set(messagesDb.set, messageID, updateMessage(message))
        await set(
            updateChatAtom,
            chatID,
            produce((draft) => {
                draft.updatedAt = Date.now()
            }),
        )
    },
)

export const chatCompletionTaskAtom = atom(O.None<ChatCompletionTask>())

export const requestChatCompletionAtom = atom(null, async (get, set, botName: string, id: ChatID) => {
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
            abort: () => {
                abortController.abort()
            },
        }),
    )

    const handleError = (err: unknown) => {
        const error = err instanceof Error ? err : new Error(stringify(err))

        toast.error(`Failed to generate chat completion:\n${error.name}:\n${error.message}`, { id: taskMeta.id })

        set(
            chatCompletionTaskAtom,
            O.Some<ChatCompletionTask>({
                ...taskMeta,
                type: "error",
                error,
            }),
        )
    }

    const result = await generateChatCompletionStream({ ...omit(["messages"], chat), content: messages })(bot)

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

    const [stream, abort] = result.get()

    stream.subscribe({
        async next(msg) {
            await set(
                updateMessageAtom,
                id,
                taskMeta.generatingMessageID,
                produce((draft) => {
                    draft.content += msg
                }),
            )
        },
        error: (err: unknown) => {
            abort.abort()
            handleError(err)
        },
        complete() {
            set(chatCompletionTaskAtom, O.Some<ChatCompletionTask>({ ...taskMeta, type: "done", content: "" }))
        },
    })
})
