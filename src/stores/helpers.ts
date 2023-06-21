import { getDefaultStore } from "jotai"

import { botsDb, chatsDb, messagesDb } from "./db"

const store = getDefaultStore()

export const suspendBeforeDbInit = async () => {
    await Promise.all([
        store.get(botsDb.suspendBeforeInit),
        store.get(chatsDb.suspendBeforeInit),
        store.get(messagesDb.suspendBeforeInit),
    ])
}
