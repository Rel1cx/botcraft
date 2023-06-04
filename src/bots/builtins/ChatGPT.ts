import chatgpt from "@/assets/chatgpt.png?w=176&h=176&fill=contain&format=webp&quality=100"
import { DEFAULT_SYSTEM_MESSAGE } from "@/constants"
import { makeID } from "@/lib/uuid"
import type { Bot } from "@/protocols/bot"
import type { MessageItem } from "@/stores"

export class ChatGPT implements Bot {
    id = "0"

    name = "ChatGPT-3.5"

    icon = chatgpt

    description = "Default bot"

    updatedAt = Date.now()

    initialPrompt = ""

    introMessage = "Hello! How can I assist you today?"

    options = {
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        max_tokens: 4096,
        top_p: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
    }

    initChat() {
        const firstMessage: MessageItem = {
            id: makeID(),
            role: "system",
            content: DEFAULT_SYSTEM_MESSAGE,
            updatedAt: Date.now(),
        }
        return [firstMessage]
    }

    estimateMessageTokenCount(message: MessageItem) {
        // TODO: Implement this
        return -1
    }

    estimateTotalTokenCount(messages: MessageItem[]) {
        // TODO: Implement this
        return -1
    }

    // @ts-expect-error TODO: Implement this
    generateChatCompletion(messages: MessageItem[]) {
        return []
    }

    // @ts-expect-error TODO: Implement this
    generateChatCompletionStream(messages: MessageItem[]) {
        return []
    }
}
