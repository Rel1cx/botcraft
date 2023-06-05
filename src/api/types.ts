import type { ChatCompletionChunk } from "@/zod"

export type EventSourceData = ChatCompletionChunk | "[DONE]"

export type Role = "user" | "assistant" | "system"

export type Model = "gpt-4" | "gpt-4-32k" | "gpt-3.5-turbo"

export type ChatCompletionOptions = {
    model: Model
    max_tokens: number
    temperature: number
    // top_p: number
    presence_penalty: number
    frequency_penalty: number
}
