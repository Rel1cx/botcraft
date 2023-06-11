import type { StrictOmit } from "ts-essentials"

import type { ChatData } from "@/bots/builtins/types"
import type { StampID } from "@/lib/uuid"
import type { ChatProtocol } from "@/protocols"

export type ChatItem = StrictOmit<ChatData, "content"> & {
    messages: StampID[]
}

export type ChatMeta = Pick<ChatProtocol, "id" | "title" | "updatedAt">
