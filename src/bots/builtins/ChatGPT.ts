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
import { makeID } from "@/lib/uuid"
import type { BotProtocol, CreatableProtocol, IconProtocol, NameProtocol } from "@/protocols"

import type { ChatData, MessageData } from "./types"

export class ChatGPT implements BotProtocol, NameProtocol, IconProtocol, CreatableProtocol {
    name = "ChatGPT-3.5"

    icon = chatgpt

    description = "Default bot"

    updatedAt = Date.now()

    prompt = ""

    intro = "Hello! How can I assist you today?"

    abortController = new AbortController()

    options: ChatCompletionOptions = DEFAULT_CHAT_COMPLETION_OPTIONS

    initChat(): ChatData {
        const firstMessage: MessageData = {
            id: makeID(),
            role: "system",
            content: DEFAULT_SYSTEM_MESSAGE,
            updatedAt: Date.now(),
        }

        return {
            id: makeID(),
            title: "",
            intro: this.intro,
            content: [firstMessage],
            updatedAt: Date.now(),
        }
    }

    estimateTokenCount(messages: MessageData[]) {
        return countTokens(messages, this.options.model)
    }

    // TODO: Implement this
    generateChatCompletion(chat: ChatData): Promise<Result<Error, unknown>> {
        return Promise.resolve(Result.Err(new Error("Not implemented")))
    }

    async generateChatCompletionStream(chat: ChatData): Promise<Result<Error, Observable<string>>> {
        const messages = chat.content
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

        const reader = stream.unwrap()?.getReader()

        if (!reader) {
            return Result.Err(new Error("Failed to get reader"))
        }

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
