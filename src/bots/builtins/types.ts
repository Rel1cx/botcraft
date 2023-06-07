import type { ContentProtocol, CreatableProtocol, RoleProtocol, StampIDProtocol, TitleProtocol } from "@/protocols"
import type { ChatMessage } from "@/zod"

export type MessageData = StampIDProtocol & CreatableProtocol & RoleProtocol & ChatMessage

export type ChatData = StampIDProtocol &
    TitleProtocol &
    CreatableProtocol &
    ContentProtocol<MessageData[]> & {
        intro: string
    }
