import { Task } from "ftld"
import type { HTTPError, KyResponse } from "ky"
import ky from "ky"
import { pick } from "rambda"

import type { ChatMessage } from "@/zod"

import { VITE_OPENAI_API_ENDPOINT } from "../env"
import type { ChatCompletionOptions } from "./types"

export const getChatCompletionStream = async (
    apiKey: string,
    messages: ChatMessage[],
    options: ChatCompletionOptions,
    customHeaders?: Record<string, string>,
    signal: AbortSignal | null = null,
) => {
    const headers: HeadersInit = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...customHeaders,
    }

    const result = await Task.from<KyResponse, HTTPError>(() =>
        ky.post(VITE_OPENAI_API_ENDPOINT, {
            signal,
            headers,
            body: JSON.stringify({
                messages: messages.map(pick(["role", "content"])),
                ...options,
                max_tokens: undefined,
                stream: true,
            }),
        }),
    ).run()

    return result.map((v) => v.body)
}
