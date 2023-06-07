import type { ChatData } from "@/bots/builtins/types"
import type { StampID } from "@/lib/uuid"
import type { ChatProtocol } from "@/protocols"

export type ChatItem = Omit<ChatData, "content"> & {
    messages: StampID[]
}

export type ChatMeta = Pick<ChatProtocol, "id" | "title" | "updatedAt">
