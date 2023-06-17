import { Result } from "@swan-io/boxed"
import { immerable } from "immer"
import type { Observable } from "rxjs"
import { from, map, mergeMap, timeout } from "rxjs"

import { getChatCompletionStream } from "@/api/client"
import { getContentFromEventSource, parseEventSource } from "@/api/helper"
import type { ChatCompletionOptions } from "@/api/types"
import chatgpt from "@/assets/chatgpt.png?w=176&h=176&fill=contain&format=webp&quality=100"
import { configManager } from "@/config"
import { DEFAULT_CHAT_COMPLETION_OPTIONS } from "@/constants"
import { makeNameGenerator } from "@/lib/name"
import { readerToObservable } from "@/lib/stream"
import { countTokens } from "@/lib/tokenizer"
import { makeID } from "@/lib/uuid"

import type { Bot, ChatData, MessageData } from "./types"

const generateName = makeNameGenerator()

export class ChatGPT implements Bot {
    [immerable] = true

    name = "ChatGPT"

    icon = chatgpt

    description = "Default bot"

    updatedAt = Date.now()

    intro = "Hello! How can I assist you today?"

    prompt = ""

    systemMessage = `You have expertise in multiple fields and can assist users in solving problems.
Try to answer user's questions as accurately as possible.`

    abortController = new AbortController()

    options: ChatCompletionOptions = DEFAULT_CHAT_COMPLETION_OPTIONS

    initChat(): ChatData {
        const firstMessage: MessageData = {
            id: makeID(),
            role: "system",
            content: this.systemMessage,
            updatedAt: Date.now(),
        }

        return {
            id: makeID(),
            title: generateName(),
            intro: this.intro,
            content: [firstMessage],
            updatedAt: Date.now(),
        }
    }

    estimateTokenCount(messages: MessageData[]) {
        return countTokens(messages, this.options.model)
    }

    // TODO: Implement this
    generateChatCompletion(chat: ChatData): Promise<Result<unknown, Error>> {
        return Promise.resolve(Result.Error(new Error("Not implemented")))
    }

    async generateChatCompletionStream(chat: ChatData): Promise<Result<Observable<string>, Error>> {
        const messages = chat.content
        const apiKey = await configManager.getConfig("apiKey")

        if (apiKey.isNone()) {
            return Result.Error(new Error("API key is not set"))
        }

        const stream = await getChatCompletionStream(
            apiKey.get(),
            messages,
            this.options,
            {},
            this.abortController.signal,
        )

        if (stream.isError()) {
            return Result.Error(stream.getError())
        }

        const reader = stream.get()?.getReader()

        if (!reader) {
            return Result.Error(new Error("Failed to get reader"))
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
