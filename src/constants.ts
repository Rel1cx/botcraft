import type { ChatCompletionOptions } from "@/api/types"
import { type Locales } from "@/i18n/i18n-types"

export const DEFAULT_LOCALE: Locales = "en"

export const DEFAULT_APP_LAYOUT = {
    hideSidebar: false,
    hideNavbar: false,
}

export const DEFAULT_CHAT_COMPLETION_OPTIONS: ChatCompletionOptions = {
    model: "gpt-3.5-turbo-16k-0613",
    temperature: 0.7,
    max_tokens: 4096,
    // top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
}
