import type {
    BotProtocol,
    ChatProtocol,
    ContentProtocol,
    CreatableProtocol,
    RoleProtocol,
    StampIDProtocol,
    TitleProtocol,
} from "@/protocols"
import type { ChatMessage } from "@/zod"

export type MessageData = StampIDProtocol & CreatableProtocol & RoleProtocol & ChatMessage

export type ChatData = (StampIDProtocol & TitleProtocol & CreatableProtocol & ContentProtocol<MessageData[]>) & {
    intro: string
}

export type Bot = BotProtocol & {
    // tokenEncode: (text: string) => Uint32Array

    // tokenDecode: (tokens: Uint32Array) => string

    initChat: () => ChatProtocol

    estimateTokenCount: (content: ChatProtocol["content"]) => number

    generateChatCompletion: (chat: ChatProtocol) => Promise<unknown>

    generateChatCompletionStream: (chat: ChatProtocol) => Promise<unknown>
}
