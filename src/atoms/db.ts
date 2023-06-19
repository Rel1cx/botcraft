import { defaultBot } from "@/bots/builtins/ChatGPT"
import type { MessageData } from "@/bots/builtins/types"
import { DB } from "@/lib/db"

import type { ChatItem } from "./bot/types"

export const chatsDB = new Map<string, DB<ChatItem>>([
    [
        defaultBot.id,
        DB.make({
            id: defaultBot.id,
            name: "chats",
        }),
    ],
])

export const messagesDB = new Map<string, DB<MessageData>>([
    [
        defaultBot.id,
        DB.make({
            id: defaultBot.id,
            name: "messages",
        }),
    ],
])
