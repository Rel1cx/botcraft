import { get } from "idb-keyval"
import { getDefaultStore } from "jotai"

import { configManager } from "@/config"
import type { StampID } from "@/lib/uuid"

import { apiKeyAtom, chatsAtom, messagesAtom } from "./bot/atoms"
import type { ChatItem, MessageItem } from "./bot/types"

export const store = getDefaultStore()

export const loadDBToAtom = async () => {
    const chats = await get<Map<StampID, ChatItem>>("chats")
    const messages = await get<Map<StampID, MessageItem>>("messages")

    if (!chats || !messages) {
        return
    }

    store.set(chatsAtom, new Map(chats))
    store.set(messagesAtom, new Map(messages))
}

export const loadConfigToAtom = async () => {
    const config = await configManager.loadConfig()
    if (config.isOk()) {
        const { apiKey } = config.unwrap()
        store.set(apiKeyAtom, apiKey)
        return
    }
    await configManager.resetConfig()
}
