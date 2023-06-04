import type { ChatCompletionOptions } from "@/api/types"

export const DEFAULT_CHAT_COMPLETION_OPTIONS: ChatCompletionOptions = {
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    max_tokens: 4096,
    // top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
}

export const DEFAULT_SYSTEM_MESSAGE = "I have expertise in multiple fields and can assist users in solving problems."
