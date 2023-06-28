import type { ChatCompletionChunk } from "@/zod"

export type EventSourceData = ChatCompletionChunk | "[DONE]"

export type Role = "user" | "assistant" | "system"

export type Model =
    | "gpt-3.5-turbo"
    | "gpt-3.5-turbo-16k"
    | "gpt-3.5-turbo-0613"
    | "gpt-3.5-turbo-16k-0613"
    | "gpt-4"
    | "gpt-4-0613"
    | "gpt-4-32k"
    | "gpt-4-32k-0613"

export type Message = {
    role: Role
    content: string
}

export type ChatCompletionOptions = {
    model: Model
    max_tokens: number
    temperature: number
    // top_p: number
    presence_penalty: number
    frequency_penalty: number
}
