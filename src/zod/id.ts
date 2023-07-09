import { uid } from "@/lib/uuid";

export type ChatID = `chat-${string}`;

export type MessageID = `msg-${string}`;

export const isChatID = (id: string): id is ChatID => id.startsWith("chat-");

export const isMessageID = (id: string): id is MessageID => id.startsWith("msg-");

export const makeChatID = (): ChatID => `chat-${uid.randomUUID()}`;

export const makeMessageID = (): MessageID => `msg-${uid.randomUUID()}`;
