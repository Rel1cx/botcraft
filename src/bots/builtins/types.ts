import type { ChatCompletionOptions } from "@/api/types"
import type {
    ContentProtocol,
    CreatableProtocol,
    IconProtocol,
    IDProtocol,
    NameProtocol,
    RoleProtocol,
    StampIDProtocol,
    TitleProtocol,
} from "@/protocols"
import type { ChatMessage } from "@/zod"

export type MessageData = StampIDProtocol & CreatableProtocol & RoleProtocol & ChatMessage

export type ChatData = (StampIDProtocol & TitleProtocol & CreatableProtocol & ContentProtocol<MessageData[]>) & {
    intro: string
}

export type Bot = (IDProtocol & NameProtocol & IconProtocol) & {
    intro: string

    prompt: string

    systemMessage: string

    options: ChatCompletionOptions
}
