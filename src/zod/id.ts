import { uid } from "@/lib/uuid"

export type ChatID = string

export type MessageID = string

export const isChatID = (id: string) => id.startsWith("chat-")

export const isMessageID = (id: string) => id.startsWith("msg-")

export const makeChatID = (): ChatID => `chat-${uid.randomUUID()}`

export const makeMessageID = (): MessageID => `msg-${uid.randomUUID()}`
