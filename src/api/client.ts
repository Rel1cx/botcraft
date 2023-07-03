import { Result as R } from "@swan-io/boxed"
import ky, { type HTTPError, type KyResponse } from "ky"

import type { ChatCompletionOptions, Message } from "./types"

export const getChatCompletion = async (
    apiKey: string,
    endpoint: string,
    messages: Message[],
    options: ChatCompletionOptions,
    customHeaders?: Record<string, string>,
    signal: AbortSignal | null = null,
) => {
    const headers: HeadersInit = {
        Authorization: `Bearer ${apiKey}`,
        ...customHeaders,
    }

    return R.fromPromise<KyResponse, HTTPError>(
        ky
            .post(endpoint, {
                signal,
                headers,
                json: {
                    messages,
                    ...options,
                    stream: false,
                },
            })
            .json(),
    )
}

export const getChatCompletionStream = async (
    apiKey: string,
    endpoint: string,
    messages: Message[],
    options: ChatCompletionOptions,
    customHeaders?: Record<string, string>,
    signal: AbortSignal | null = null,
) => {
    const headers: HeadersInit = {
        Authorization: `Bearer ${apiKey}`,
        ...customHeaders,
    }

    const result = await R.fromPromise<KyResponse, HTTPError>(
        ky.post(endpoint, {
            signal,
            headers,
            json: {
                messages,
                ...options,
                max_tokens: undefined,
                stream: true,
            },
        }),
    )

    return result.map((r) => r.body)
}
