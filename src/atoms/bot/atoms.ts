import { Option as O } from "@swan-io/boxed"
import { atom } from "jotai"
import { atomWithImmer } from "jotai-immer"
import { omit, pick, sortBy } from "rambda"
import toast from "react-hot-toast"
import { stringify } from "telejson"
import invariant from "tiny-invariant"

import { defaultBot, generateChatCompletionStream } from "@/bots/builtins/ChatGPT"
import type { ChatData, MessageData } from "@/bots/builtins/types"
import type { StampID } from "@/lib/uuid"
import { makeID } from "@/lib/uuid"

import { chatsDB, messagesDB } from "../db"
import type { ChatCompletionTask, ChatCompletionTaskMeta, ChatItem, ChatMeta } from "./types"

export const botAtom = atomWithImmer(defaultBot)

export const chatsAtom = atomWithImmer<Map<StampID, ChatItem>>(new Map())

export const messagesAtom = atomWithImmer<Map<StampID, MessageData>>(new Map())

export const chatMetaAtom = atom((get) => {
    return Array.from(get(chatsAtom).values()).reduceRight<ChatMeta[]>((acc, item) => {
        const title = item.title === "" ? "Untitled" : item.title

        acc.push({
            title,
            ...pick(["id", "updatedAt"], item),
        })

        return acc
    }, [])
})

export const messageMetaAtom = atom((get) => {
    return Object.values(get(messagesAtom)).map(pick(["id", "Role", "updatedAt"]))
})

export const sortedChatsAtom = atom((get) => {
    return sortBy((chat) => -chat.updatedAt, get(chatMetaAtom))
})

export const addChatAtom = atom(null, (get, set, payload: ChatData) => {
    const botID = get(botAtom).id
    const messages = new Set<StampID>()
    const chat = {
        ...omit(["content"], payload),
        messages: Array.from(messages),
    }
    set(messagesAtom, (draft) => {
        for (const message of payload.content) {
            draft.set(message.id, message)
            messages.add(message.id)
        }
    })
    set(chatsAtom, (draft) => {
        draft.set(chat.id, chat)
    })
    void messagesDB.get(botID)?.setMany(Object.entries(payload.content))
    void chatsDB.get(botID)?.set(payload.id, chat)
})

export const removeChatAtom = atom(null, (get, set, id: StampID) => {
    const botID = get(botAtom).id
    set(chatsAtom, (draft) => {
        draft.delete(id)
    })
    void chatsDB.get(botID)?.delete(id)
})

export const updateChatAtom = atom(null, (get, set, id: StampID, mutator: (draft: ChatItem) => void) => {
    const botID = get(botAtom).id
    set(chatsAtom, (draft) => {
        const chat = draft.get(id)
        invariant(chat, "Chat not found")
        mutator(chat)
    })
    const chat = get(chatsAtom).get(id)
    invariant(chat, "Chat not found")
    void chatsDB.get(botID)?.set(id, chat)
})

export const addMessageAtom = atom(null, (get, set, payload: MessageData) => {
    const botID = get(botAtom).id
    set(messagesAtom, (draft) => {
        draft.set(payload.id, payload)
    })
    void messagesDB.get(botID)?.set(payload.id, payload)
})

export const removeMessageAtom = atom(null, (get, set, id: StampID) => {
    const botID = get(botAtom).id
    set(messagesAtom, (draft) => {
        Reflect.deleteProperty(draft, id)
    })
    void messagesDB.get(botID)?.delete(id)
})

export const chatCompletionTaskAtom = atom(O.None<ChatCompletionTask>())

export const requestChatCompletionAtom = atom(null, async (get, set, id: StampID) => {
    const bot = get(botAtom)
    const chat = get(chatsAtom).get(id)

    if (!chat) {
        return
    }

    const content = Array.from(get(messagesAtom).values())

    const abortController = new AbortController()

    const taskMeta: ChatCompletionTaskMeta = {
        id: makeID(),
        chatID: id,
        generatingMessageID: makeID(),
    }

    const message: MessageData = {
        id: taskMeta.generatingMessageID,
        content: "",
        role: "assistant",
        updatedAt: Date.now(),
    }

    set(messagesAtom, (draft) => {
        draft.set(taskMeta.generatingMessageID, message)
    })

    set(chatsAtom, (draft) => {
        draft.get(id)?.messages.push(taskMeta.generatingMessageID)
    })

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

    const result = await generateChatCompletionStream({ ...omit(["messages"], chat), content })(bot)

    if (!result.isOk()) {
        const error = result.getError()
        handleError(error)
        return
    }

    const [stream, abort] = result.get()

    stream.subscribe({
        next(msg) {
            set(messagesAtom, (draft) => {
                const message = draft.get(taskMeta.generatingMessageID)
                invariant(message, "chat should exist")
                message.content += msg
                message.updatedAt = Date.now()
            })
            set(chatsAtom, (draft) => {
                const chat = draft.get(id)
                invariant(chat, "chat should exist")
                chat.updatedAt = Date.now()
            })
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
