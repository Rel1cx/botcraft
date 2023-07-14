import { Result as R } from "@swan-io/boxed";
import ky, { type HTTPError, type KyResponse } from "ky";
import { omit } from "rambda";
import { z } from "zod";

import type { ChatCompletionOptions, Message } from "./types";

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
    };

    return R.fromPromise<KyResponse, HTTPError>(
        ky
            .post("chat/completions", {
                prefixUrl: endpoint,
                signal,
                headers,
                // TODO: Remove this omit once token counting is implemented
                json: omit("max_tokens", {
                    messages,
                    ...options,
                    stream: false,
                }),
            })
            .json(),
    );
};

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
    };

    const result = await R.fromPromise<KyResponse, HTTPError>(
        ky.post("chat/completions", {
            prefixUrl: endpoint,
            signal,
            headers,
            json: omit("max_tokens", {
                messages,
                ...options,
                stream: true,
            }),
        }),
    );

    return result.map((r) => r.body);
};

export const getAvailableModels = async (apiKey: string, endpoint: string) => {
    const task = async () => {
        const headers: HeadersInit = {
            Authorization: `Bearer ${apiKey}`,
        };

        const resp = await ky
            .get("models", {
                prefixUrl: endpoint,
                headers,
            })
            .json();

        return z
            .array(z.object({ id: z.string() }))
            .parse(resp)
            .map((m) => m.id);
    };

    return R.fromPromise<string[], Error>(task());
};
