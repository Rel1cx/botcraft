import { MiniDb } from "jotai-minidb"

import { defaultBot, initChat } from "@/bots/builtins/chatgpt"
import type { Bot, MessageData } from "@/bots/builtins/types"
import type { ChatItem } from "@/types"

export const initialChat = initChat()(defaultBot)

export const initialBots: Record<string, Bot> = {
    [defaultBot.name]: {
        ...defaultBot,
        chats: [initialChat.id],
    },
}

export const initialChats: Record<string, ChatItem> = {
    [initialChat.id]: {
        ...initialChat,
        messages: initialChat.content.map((message) => message.id),
    },
}

export const initialMessages: Record<string, MessageData> = Object.fromEntries(
    initialChat.content.map((message) => [message.id, message]),
)

export const botsDb = new MiniDb<Bot>({
    name: "bots",
    version: 0,
    initialData: initialBots,
})

export const chatsDb = new MiniDb<ChatItem>({
    name: "chats",
    version: 0,
    initialData: initialChats,
})

export const messagesDb = new MiniDb<MessageData>({
    name: "messages",
    version: 0,
    initialData: initialMessages,
})
