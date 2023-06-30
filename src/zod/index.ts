import { z } from "zod"

export const Env = z.object({
    DEV: z.optional(z.boolean()).default(false),
    PROD: z.optional(z.boolean()).default(true),
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

export const ChatCompletionData = z.object({
    id: z.string(),
    object: z.literal("chat.completion"),
    created: z.number(),
    model: Model,
    choices: z.array(
        z.object({
            message: z.object({
                role: z.optional(Role),
                content: z.optional(z.string()),
            }),
            index: z.number(),
            finish_reason: z.null().or(z.string()),
        }),
    ),
    usage: z.object({
        prompt_tokens: z.number(),
        completion_tokens: z.number(),
        total_tokens: z.number(),
    }),
})

export type ChatCompletionData = z.infer<typeof ChatCompletionData>

export const isChatCompletionData = (value: unknown): value is ChatCompletionData => {
    return ChatCompletionData.safeParse(value).success
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
