import { defaultBot } from "@/bots/builtins/ChatGPT"
import { DB } from "@/lib/db"

export const chatsDB = new Map([
    [
        defaultBot.name,
        DB.make({
            id: defaultBot.name,
            name: "chats",
        }),
    ],
])

export const messagesDB = new Map([
    [
        defaultBot.name,
        DB.make({
            id: defaultBot.name,
            name: "messages",
        }),
    ],
])
