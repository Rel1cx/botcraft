import { z } from "zod"

export const Env = z.object({
    DEV: z.optional(z.boolean()).default(false),
    PROD: z.optional(z.boolean()).default(true),
    VITE_OPENAI_API_ENDPOINT: z.optional(z.string()).default("https://api.openai.com/v1/chat/completions"),
    VITE_OPENAI_API_KEY: z.optional(z.string()),
})

export type Env = z.infer<typeof Env>

export const Role = z.union([z.literal("user"), z.literal("assistant"), z.literal("system")])

export type Role = z.infer<typeof Role>

export const isRole = (value: unknown): value is Role => {
    return Role.safeParse(value).success
}

export const Model = z.union([
    z.literal("gpt-3.5-turbo"),
    z.literal("gpt-3.5-turbo-16k"),
    z.literal("gpt-3.5-turbo-0613"),
    z.literal("gpt-3.5-turbo-16k-0613"),
    z.literal("gpt-4"),
    z.literal("gpt-4-0613"),
    z.literal("gpt-4-32k"),
    z.literal("gpt-4-32k-0613"),
])

export type Model = z.infer<typeof Model>

export const isModel = (value: unknown): value is Model => {
    return Model.safeParse(value).success
}

export const ChatMessage = z.object({
    role: Role,
    content: z.string(),
})

export type ChatMessage = z.infer<typeof ChatMessage>

export const isChatMessage = (value: unknown): value is ChatMessage => {
    return ChatMessage.safeParse(value).success
}

export const ChatCompletionChunk = z.object({
    id: z.string(),
    object: z.literal("chat.completion.chunk"),
    created: z.number(),
    model: Model,
    choices: z.array(
        z.object({
            delta: z.object({
                role: z.optional(Role),
                content: z.optional(z.string()),
            }),
            index: z.number(),
            finish_reason: z.null().or(z.string()),
        }),
    ),
})

export type ChatCompletionChunk = z.infer<typeof ChatCompletionChunk>

export const isChatCompletionChunk = (value: unknown): value is ChatCompletionChunk => {
    return ChatCompletionChunk.safeParse(value).success
}

export const ChatCompletionError = z.object({
    error: z.object({
        message: z.string(),
        type: z.string(),
        param: z.string(),
        code: z.string(),
    }),
})

export type ChatCompletionError = z.infer<typeof ChatCompletionError>

export const isChatCompletionError = (value: unknown): value is ChatCompletionError => {
    return ChatCompletionError.safeParse(value).success
}
