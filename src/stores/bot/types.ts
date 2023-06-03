import type { StampID } from "@/lib/uuid"
import type { ChatProtocol, MessageProtocol } from "@/protocols/chat"

export type ChatItem = Omit<ChatProtocol, "content"> & {
    messages: StampID[]
}

export type MessageItem = MessageProtocol

export type ChatMeta = Pick<ChatProtocol, "id" | "title" | "updatedAt">
