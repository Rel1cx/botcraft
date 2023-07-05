import type { Option as O } from "@swan-io/boxed"
import { MiniDb } from "jotai-minidb"

import type { Bot, MessageData } from "@/bot/types"
import type { ChatItem } from "@/types"
import type { MessageID } from "@/zod/id"

import { INITIAL_BOTS, INITIAL_CHATS, INITIAL_MESSAGES } from "./initials"

export const botsDb = new MiniDb<Bot>({
    name: "bots",
    version: 0,
    initialData: INITIAL_BOTS,
})

export const chatsDb = new MiniDb<ChatItem>({
    name: "chats",
    version: 0,
    initialData: INITIAL_CHATS,
})

export const messagesDb = new MiniDb<MessageData>({
    name: "messages",
    version: 0,
    initialData: INITIAL_MESSAGES,
})

export const draftsDb = new MiniDb<{
    content: string
    messageID: O<MessageID>
}>({
    name: "drafts",
    version: 0,
})
