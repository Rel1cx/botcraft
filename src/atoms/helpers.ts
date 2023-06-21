import { botsDb, chatsDb, messagesDb } from "./db"
import { store } from "./stores"

export const suspendBeforeDbInit = async () => {
    await Promise.all([
        store.get(botsDb.suspendBeforeInit),
        store.get(chatsDb.suspendBeforeInit),
        store.get(messagesDb.suspendBeforeInit),
    ])
}
