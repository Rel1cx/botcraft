import { Result } from "@swan-io/boxed"
import { from, map, mergeMap, type Observable } from "rxjs"

import { getChatCompletionStream } from "@/api/client"
import { getContentFromEventSource, parseEventSource } from "@/api/helper"
import chatgpt from "@/assets/chatgpt.png?w=176&h=176&fill=contain&format=webp&quality=100"
import { DEFAULT_CHAT_COMPLETION_OPTIONS } from "@/constants"
import { makeNameGenerator } from "@/lib/name"
import { readerToObservable } from "@/lib/stream"
import { stripIndentTrim } from "@/lib/strip-indent"
import { countTokens } from "@/lib/tokenizer"
import { makeChatID, makeMessageID } from "@/zod/id"

import type { Bot, ChatData, MessageData } from "./types"

const botNameGenerator = makeNameGenerator()

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
        title: botNameGenerator(),
        intro: bot.intro,
        content: [firstMessage],
        updatedAt: Date.now(),
    }
}

export const estimateTokenCount = (messages: Pick<MessageData, "role" | "content">[]) => (bot: Bot) => {
    return countTokens(messages, bot.options.model)
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
