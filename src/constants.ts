import type { ChatCompletionOptions } from "@/api/types"
import { type Locales } from "@/i18n/i18n-types"

import { stripIndentTrim } from "./lib/string"

export const DEFAULT_LOCALE: Locales = "en"

export const DEFAULT_API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

export const DEFAULT_CHAT_COMPLETION_OPTIONS: ChatCompletionOptions = {
    model: "gpt-3.5-turbo-16k-0613",
    temperature: 0.7,
    max_tokens: 4096,
    // top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
}

export const DEFAULT_INTRO = "Hello! How can I assist you today?"

export const DEFAULT_SYSTEM_MESSAGE = stripIndentTrim(`
      You have expertise in multiple fields and can assist users in solving problems.
      Try to answer user's questions as accurately as possible.
`)

export const DEFAULT_CHAT_TITLE_COMPLETION_PROMPT: Record<Locales, string> = {
    "zh-CN": "为本次聊天生成一个简短的标题\n只回复标题，不要包含除标题外的任何其他文本",
    // eslint-disable-next-line max-len
    en: "Generate a brief title for this chat\nJust reply with the title, don't include any other text besides the title",
}
