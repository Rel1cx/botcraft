import { Result } from "ftld"
import type { Observable } from "rxjs"
import { from, map, mergeMap, timeout } from "rxjs"

import { getChatCompletionStream } from "@/api/client"
import { getContentFromEventSource, parseEventSource } from "@/api/helper"
import type { ChatCompletionOptions } from "@/api/types"
import chatgpt from "@/assets/chatgpt.png?w=176&h=176&fill=contain&format=webp&quality=100"
import { configManager } from "@/config"
import { DEFAULT_CHAT_COMPLETION_OPTIONS, DEFAULT_SYSTEM_MESSAGE } from "@/constants"
import { readerToObservable } from "@/lib/stream"
import { countTokens } from "@/lib/tokenizer"
import type { ChatMessage } from "@/zod"

import type { Bot } from "./Bot"

export class ChatGPT implements Bot {
    id = "0"

    name = "ChatGPT-3.5"

    icon = chatgpt

    description = "Default bot"

    updatedAt = Date.now()

    initialPrompt = ""

    introMessage = "Hello! How can I assist you today?"

    abortController = new AbortController()

    options: ChatCompletionOptions = DEFAULT_CHAT_COMPLETION_OPTIONS

    initChat() {
        const firstMessage: ChatMessage = {
            role: "system",
            content: DEFAULT_SYSTEM_MESSAGE,
        }
        return [firstMessage]
    }

    estimateTokenCount(messages: ChatMessage[]) {
        return countTokens(messages, this.options.model)
    }

    // TODO: Implement this
    generateChatCompletion(messages: ChatMessage[]) {
        return Promise.resolve(Result.Err(new Error("Not implemented")))
    }

    async generateChatCompletionStream(messages: ChatMessage[]): Promise<Result<Error, Observable<string>>> {
        const apiKey = await configManager.getConfig("apiKey")

        const stream = await getChatCompletionStream(
            apiKey.unwrap(),
            messages,
            this.options,
            {},
            this.abortController.signal,
        )

        if (stream.isErr()) {
            return Result.Err(stream.unwrapErr())
        }

        const reader = stream.unwrap().getReader()

        const observable = readerToObservable(reader)

        const textDecoder = new TextDecoder()

        return Result.Ok(
            observable.pipe(
                timeout(8000),
                map((value) => textDecoder.decode(value)),
                map(parseEventSource),
                mergeMap((events) => from(events)),
                map(getContentFromEventSource),
            ),
        )
    }
}
