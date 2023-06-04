import { Option as O } from "ftld"
import { set } from "idb-keyval"
import { atom, getDefaultStore } from "jotai"
import { atomWithImmer } from "jotai-immer"
import { omit, pick, sortBy } from "rambda"
import { stringify } from "telejson"
import invariant from "tiny-invariant"

import { ChatGPT } from "@/bots/builtins/ChatGPT"
import { configManager } from "@/config"
import type { Remap } from "@/lib/utilityTypes"
import type { StampID } from "@/lib/uuid"
import { makeID } from "@/lib/uuid"
import type { BotProtocol } from "@/protocols/bot"

import type { ChatItem, ChatMeta, MessageItem } from "./types"

const defaultBot = new ChatGPT()

const store = getDefaultStore()

export const apiKeyAtom = atom("", (_, set, payload: string) => {
    const val = payload.trim()
    set(apiKeyAtom, val)
    void configManager.setConfig("apiKey", val)
})

export const botsAtom = atomWithImmer<Record<string, BotProtocol>>({})

export const chatsAtom = atomWithImmer<Record<StampID, ChatItem>>({})

store.sub(chatsAtom, () => {
    void set("chats", store.get(chatsAtom))
})

export const messagesAtom = atomWithImmer<Record<StampID, MessageItem>>({})

store.sub(messagesAtom, () => {
    void set("messages", store.get(messagesAtom))
})

export const chatMetaAtom = atom((get) => {
    return Object.values(get(chatsAtom)).reduceRight<ChatMeta[]>((acc, item) => {
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

export const addChatAtom = atom(null, (_, set, payload: ChatItem) => {
    set(chatsAtom, (draft) => {
        draft[payload.id] = payload
    })
})

export const removeChatAtom = atom(null, (_, set, id: StampID) => {
    set(chatsAtom, (draft) => {
        Reflect.deleteProperty(draft, id)
    })
})

export const updateChatAtom = atom(null, (_, set, id: StampID, mutator: (draft: ChatItem) => void) => {
    set(chatsAtom, (draft) => {
        const chat = draft[id]
        invariant(chat, "Chat not found")
        void mutator(chat)
    })
})

export const addMessageAtom = atom(null, (_, set, payload: MessageItem) => {
    set(messagesAtom, (draft) => {
        draft[payload.id] = payload
    })
})

export const removeMessageAtom = atom(null, (_, set, id: StampID) => {
    set(messagesAtom, (draft) => {
        Reflect.deleteProperty(draft, id)
    })
})

export type ChatCompletionTaskMeta = {
    id: StampID
    chatID: StampID
    generatingMessageID: StampID
}

export type ChatCompletionTask =
    | Remap<
          {
              type: "pending"
              abort: () => void
          } & ChatCompletionTaskMeta
      >
    | Remap<
          {
              type: "done"
              content: string
          } & ChatCompletionTaskMeta
      >
    | Remap<
          {
              type: "error"
              error: Error
          } & ChatCompletionTaskMeta
      >

export const chatCompletionTaskAtom = atom(O.None<ChatCompletionTask>())

export const requestChatCompletionAtom = atom(null, async (get, set, id: StampID) => {
    const chat = get(chatsAtom)[id]

    if (!chat) {
        return
    }

    const messages: Omit<MessageItem, "id">[] = Object.values(get(messagesAtom)).map(omit(["id"]))

    const abortController = new AbortController()

    const taskMeta: ChatCompletionTaskMeta = {
        id: makeID(),
        chatID: id,
        generatingMessageID: makeID(),
    }

    const message: MessageItem = {
        id: taskMeta.generatingMessageID,
        content: "",
        role: "assistant",
        updatedAt: Date.now(),
    }

    set(messagesAtom, (draft) => {
        draft[taskMeta.generatingMessageID] = message
    })

    set(chatsAtom, (draft) => {
        draft[id]?.messages.push(taskMeta.generatingMessageID)
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

    const handleError = (error: unknown) => {
        set(
            chatCompletionTaskAtom,
            O.Some<ChatCompletionTask>({
                ...taskMeta,
                type: "error",
                error: error instanceof Error ? error : new Error(stringify(error)),
            }),
        )
    }

    const stream = await defaultBot.generateChatCompletionStream(messages)

    if (stream.isErr()) {
        const error = stream.unwrapErr()
        handleError(error)
        return
    }

    stream.unwrap().subscribe({
        next(msg) {
            set(messagesAtom, (draft) => {
                const message = draft[taskMeta.generatingMessageID]
                invariant(message, "chat should exist")
                message.content += msg
                message.updatedAt = Date.now()
            })
            set(chatsAtom, (draft) => {
                const chat = draft[id]
                invariant(chat, "chat should exist")
                chat.updatedAt = Date.now()
            })
        },
        error: handleError,
        complete() {
            set(chatCompletionTaskAtom, O.Some<ChatCompletionTask>({ ...taskMeta, type: "done", content: "" }))
        },
    })
})
