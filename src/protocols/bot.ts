import type { ChatMessage } from "@/zod"

export type BotProtocol = {
    prompt: string

    intro: string

    options: Record<string, unknown>

    // tokenEncode: (text: string) => Uint32Array

    // tokenDecode: (tokens: Uint32Array) => string

    initChat: () => ChatMessage[]

    estimateTokenCount: (message: ChatMessage[]) => number

    generateChatCompletion: (messages: ChatMessage[]) => Promise<unknown>

    generateChatCompletionStream: (messages: ChatMessage[]) => Promise<unknown>
}
