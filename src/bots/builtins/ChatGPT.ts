import { Result } from "@swan-io/boxed"
import { from, map, mergeMap, type Observable } from "rxjs"

import { getChatCompletion, getChatCompletionStream } from "@/api/client"
import { getContentFromEventSource, parseEventSource } from "@/api/helper"
import chatgpt from "@/assets/chatgpt.png?w=176&h=176&fill=contain&format=webp&quality=100"
import { DEFAULT_CHAT_COMPLETION_OPTIONS } from "@/constants"
import { makeNameGenerator } from "@/lib/name-generator"
import { readerToObservable } from "@/lib/stream"
import { stripIndentTrim } from "@/lib/string"
import { countTokens } from "@/lib/tokenizer"
import { ChatCompletionData } from "@/zod"
import { makeChatID, makeMessageID } from "@/zod/id"

import type { Bot, ChatData, MessageData } from "./types"

const nameGenerator = makeNameGenerator()

export const defaultBot: Bot = {
    name: "ChatGPT",
    icon: chatgpt,
    intro: "Hello! How can I assist you today?",
    prompt: "",
    systemMessage: stripIndentTrim(`
      You have expertise in multiple fields and can assist users in solving problems.
      Try to answer user's questions as accurately as possible.
    `),
    options: DEFAULT_CHAT_COMPLETION_OPTIONS,
    chats: [],
}

// eslint-disable-next-line unicorn/consistent-function-scoping
export const initChat = () => (bot: Bot): ChatData => {
    const firstMessage: MessageData = {
        id: makeMessageID(),
        role: "system",
        content: bot.systemMessage,
        updatedAt: Date.now(),
    }

    return {
        id: makeChatID(),
        title: nameGenerator(),
        intro: bot.intro,
        content: [firstMessage],
        updatedAt: Date.now(),
    }
}

export const estimateTokenCount = (messages: Pick<MessageData, "role" | "content">[]) => (bot: Bot) => {
    return countTokens(messages, bot.options.model)
}

export const generateChatTitle = (apiKey: string, endpoint: string, chat: ChatData) => async (bot: Bot) => {
    const messages: MessageData[] = [
        ...chat.content,
        { id: makeMessageID(), role: "user", content: "Generate a brief title for this chat.", updatedAt: Date.now() },
    ]

    const result = await getChatCompletion(apiKey, endpoint, messages, bot.options)

    if (result.isError()) {
        return Result.Error(result.getError())
    }

    const completion = ChatCompletionData.safeParse(result.get())

    if (!completion.success) {
        return Result.Error(completion.error)
    }

    const choice = completion.data.choices[0]

    if (!choice) {
        return Result.Error(new Error("Failed to get completion"))
    }

    const title = choice.message.content

    if (!title) {
        return Result.Error(new Error("Failed to get title"))
    }

    return Result.Ok(title)
}

export const generateChatCompletion =
    (apiKey: string, endpoint: string, chat: ChatData) => async (bot: Bot): Promise<Result<string, Error>> => {
        const messages = chat.content
        const result = await getChatCompletion(apiKey, endpoint, messages, bot.options)

        if (result.isError()) {
            return Result.Error(result.getError())
        }

        const completion = ChatCompletionData.safeParse(result.get())

        if (!completion.success) {
            return Result.Error(completion.error)
        }

        const choice = completion.data.choices[0]

        if (!choice) {
            return Result.Error(new Error("Failed to get completion"))
        }

        return Result.Ok(choice.message.content ?? "")
    }

export const generateChatCompletionStream =
    (apiKey: string, endpoint: string, chat: ChatData, signal?: AbortSignal) =>
    async (bot: Bot): Promise<Result<Observable<string>, Error>> => {
        const messages = chat.content
        const stream = await getChatCompletionStream(apiKey, endpoint, messages, bot.options, {}, signal)

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
                // timeout(8000),
                map((value) => textDecoder.decode(value)),
                map(parseEventSource),
                mergeMap((events) => from(events)),
                map(getContentFromEventSource),
            ),
        )
    }
