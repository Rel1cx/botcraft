import { Tiktoken } from "@dqbd/tiktoken/lite";

import type { Model } from "@/api";
import type { ChatMessage } from "@/zod";

const cl100k_base = await import("@dqbd/tiktoken/encoders/cl100k_base.json");

export const encoder = new Tiktoken(
    cl100k_base.bpe_ranks,
    {
        ...cl100k_base.special_tokens,
        "<|im_start|>": 100264,
        "<|im_end|>": 100265,
        "<|im_sep|>": 100266,
    },
    cl100k_base.pat_str,
);

// https://github.com/dqbd/tiktoken/issues/23#issuecomment-1483317174
export const getChatGPTEncoding = (messages: ChatMessage[], model: Model) => {
    const isGpt3 = model.startsWith("gpt-3.5-turbo");

    const msgSep = isGpt3 ? "\n" : "";
    const roleSep = isGpt3 ? "\n" : "<|im_sep|>";

    const serialized = [
        messages
            .map(({ content, role }) => {
                return `<|im_start|>${role}${roleSep}${content}<|im_end|>`;
            })
            .join(msgSep),
        `<|im_start|>assistant${roleSep}`,
    ].join(msgSep);

    return encoder.encode(serialized, "all");
};

export const countTokens = (messages: ChatMessage[], model: Model) => {
    if (messages.length === 0) {
        return 0;
    }
    return getChatGPTEncoding(messages, model).length;
};
