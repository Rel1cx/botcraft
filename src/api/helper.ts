import { parse, stringify } from "telejson";

import { isChatCompletionChunk } from "@/zod";

import type { EventSourceData } from "./types";

const parseChunk = (chunk: string): EventSourceData => {
    try {
        const jsonString = chunk
            .split("\n")
            .map((line) => line.replace(/^data: /u, ""))
            .join("");

        if (jsonString === "[DONE]") {
            return jsonString;
        }

        const parsed: unknown = parse(jsonString);

        if (isChatCompletionChunk(parsed)) {
            return parsed;
        }

        throw new Error(`Unknown chunk format: ${jsonString}`);
    } catch (error) {
        throw new Error(stringify(error));
    }
};

export const parseEventSource = (data: string) => {
    return data.split("\n\n").filter(Boolean).map(parseChunk);
};

export const getContentFromEventSource = (event: EventSourceData) => {
    if (event === "[DONE]") {
        return "";
    }

    return event.choices[0]?.delta?.content ?? "";
};
