import { omit } from "rambda";

import type { Bot, MessageData } from "@/bot";
import { defaultBot, initChat } from "@/bot";
import type { ChatItem } from "@/types";

export const INITIAL_CHAT = initChat()(defaultBot);

export const INITIAL_BOTS: Record<string, Bot> = {
    [defaultBot.name]: {
        ...defaultBot,
        chats: [INITIAL_CHAT.id],
    },
};

export const INITIAL_CHATS: Record<string, ChatItem> = {
    [INITIAL_CHAT.id]: {
        ...omit(["content"], INITIAL_CHAT),
        messages: INITIAL_CHAT.content.map((message) => message.id),
    },
};

export const INITIAL_MESSAGES: Record<string, MessageData> = Object.fromEntries(
    INITIAL_CHAT.content.map((message) => [message.id, message]),
);
