import { Result as R } from "@swan-io/boxed"
import type { HTTPError, KyResponse } from "ky"
import ky from "ky"
import { pick } from "rambda"

import type { ChatMessage } from "@/zod"

import type { ChatCompletionOptions } from "./types"

export const getChatCompletion = async (
    apiKey: string,
    endpoint: string,
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

    return R.fromPromise<KyResponse, HTTPError>(
        ky
            .post(endpoint, {
                signal,
                headers,
                body: JSON.stringify({
                    messages: messages.map(pick(["role", "content"])),
                    ...options,
                    stream: false,
                }),
            })
            .json(),
    )
}

export const getChatCompletionStream = async (
    apiKey: string,
    endpoint: string,
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

    const result = await R.fromPromise<KyResponse, HTTPError>(
        ky.post(endpoint, {
            signal,
            headers,
            body: JSON.stringify({
                messages: messages.map(pick(["role", "content"])),
                ...options,
                max_tokens: undefined,
                stream: true,
            }),
        }),
    )

    return result.map((r) => r.body)
}
