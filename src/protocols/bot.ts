import type { Observable } from "rxjs"

import type { MessageItem } from "@/stores"

import type { CreatableProtocol, IDProtocol, NameProtocol } from "./base"

export type BotProtocol = {
    initialPrompt: string
    introMessage: string
    options: Record<string, unknown>
}

export abstract class Bot implements IDProtocol, NameProtocol, CreatableProtocol, BotProtocol {
    abstract id: string

    abstract name: string

    abstract description: string

    abstract updatedAt: number

    abstract initialPrompt: string

    abstract introMessage: string

    abstract options: Record<string, unknown>

    abstract initChat(): MessageItem[]

    abstract estimateMessageTokenCount(message: MessageItem): number

    abstract estimateTotalTokenCount(messages: MessageItem[]): number

    abstract generateChatCompletion(messages: MessageItem[]): Promise<MessageItem>

    abstract generateChatCompletionStream(messages: MessageItem[]): Observable<MessageItem>
}
