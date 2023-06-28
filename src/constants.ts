import type { ChatCompletionOptions } from "@/api/types"
import { type Locales } from "@/i18n/i18n-types"

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

export const DEFAULT_SYSTEM_MESSAGE = ""

export const DEFAULT_CHAT_TITLE_COMPLETION_PROMPT: Record<Locales, string> = {
    "zh-CN": "为本次聊天生成一个简短的标题, 可以选一个合适的 emoji 开头\n只回复标题, 不要包含除标题外的任何其他文本",
    // eslint-disable-next-line max-len
    en: "Generate a short title for this chat, you can choose a suitable emoji to start\nOnly reply with the title, do not include any other text except the title",
}
