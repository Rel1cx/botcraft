import { get } from "idb-keyval"

import type { MessageData } from "@/bots/builtins/types"
import { configManager } from "@/config"
import type { StampID } from "@/lib/uuid"

import { apiKeyAtom } from "./app/atoms"
import { chatsAtom, messagesAtom } from "./bot/atoms"
import type { ChatItem } from "./bot/types"
import { appStore } from "./stores"

export const loadDBToAtom = async () => {
    // const chats = await get<Map<StampID, ChatItem>>("chats")
    // const messages = await get<Map<StampID, MessageData>>("messages")
    // if (!chats || !messages) {
    //     return
    // }
    // store.set(chatsAtom, new Map(chats))
    // store.set(messagesAtom, new Map(messages))
}

export const loadConfigToAtom = async () => {
    const config = await configManager.loadConfig()
    if (config.isOk()) {
        const { apiKey } = config.get()
        appStore.set(apiKeyAtom, apiKey)
        return
    }
    await configManager.resetConfig()
}