import type { BotProtocol, CreatableProtocol, IconProtocol, NameProtocol } from "@/protocols"
import type { ChatMessage } from "@/zod"

export abstract class Bot implements BotProtocol, NameProtocol, IconProtocol, CreatableProtocol {
    abstract name: string

    abstract description: string

    abstract updatedAt: number

    abstract initialPrompt: string

    abstract introMessage: string

    abstract options: Record<string, unknown>

    abstract icon: string

    // abstract tokenEncode: (text: string) => Uint32Array

    // abstract tokenDecode: (tokens: Uint32Array) => string

    abstract initChat(): ChatMessage[]

    abstract estimateTokenCount(message: ChatMessage[]): number

    abstract generateChatCompletion(messages: ChatMessage[]): Promise<unknown>

    abstract generateChatCompletionStream(messages: ChatMessage[]): Promise<unknown>
}
