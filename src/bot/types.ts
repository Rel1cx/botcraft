import type { ChatCompletionOptions } from "@/api"
import type {
    ContentProtocol,
    CreatableProtocol,
    DeletableProtocol,
    IconProtocol,
    IDProtocol,
    NameProtocol,
    RoleProtocol,
    TitleProtocol,
} from "@/protocols"
import type { ChatMessage } from "@/zod"
import type { ChatID, MessageID } from "@/zod/id"

export type MessageData = IDProtocol &
    CreatableProtocol &
    RoleProtocol &
    ChatMessage & {
        id: MessageID
    }

export type ChatData = (IDProtocol &
    TitleProtocol &
    CreatableProtocol &
    DeletableProtocol &
    ContentProtocol<MessageData[]>) & {
    id: ChatID
    intro: string
}

export type Bot = (NameProtocol & IconProtocol) & {
    intro: string

    prompt: string

    systemMessage: string

    options: ChatCompletionOptions

    chats: ChatID[]
}
