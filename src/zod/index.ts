import { z } from "zod"

export const Env = z.object({
    VITE_OPENAI_API_ENDPOINT: z.string().default("https://api.openai.com/v1/chat/completions"),
    VITE_OPENAI_API_KEY: z.string(),
})

export type Env = z.infer<typeof Env>

export const Config = z.object({
    apiKey: z.string().describe("OpenAI api key"),
    // model: z.string().describe("OpenAI model"),
    // temperature: z.number().min(0).max(1).describe("OpenAI temperature"),
    // max_tokens: z.number().min(1).max(4097).describe("OpenAI max tokens"),
    // top_p: z.number().min(0).max(1).describe("OpenAI top p"),
    // best_of: z.number().min(1).max(16).describe("OpenAI best of"),
    // n: z.number().min(1).max(16).describe("OpenAI n"),
    // frequency_penalty: z.number().min(0).max(1).describe("OpenAI presence penalty"),
    // presence_penalty: z.number().min(0).max(1).describe("OpenAI frequency penalty"),
})

export type Config = z.infer<typeof Config>

export const ChatMessage = z.object({
    role: z.string(),
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
    model: z.string(),
    choices: z.array(
        z.object({
            delta: z.object({
                role: z.optional(z.string()),
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
