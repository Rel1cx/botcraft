import { atom, useAtom, useAtomValue } from "jotai"
import { sortBy } from "rambda"
import * as React from "react"
import invariant from "tiny-invariant"

import type { ChatID, MessageID } from "@/zod/id"

import { botsDb, chatsDb, messagesDb } from "./db"

export const useBot = (name: string) => {
    return useAtom(botsDb.item(name))
}

export const useChat = (id: ChatID) => {
    return useAtom(chatsDb.item(id))
}

export const useMessage = (id: MessageID) => {
    return useAtom(messagesDb.item(id))
}

export const useChats = (botName: string) => {
    const [bot] = useBot(botName)
    invariant(bot, `Bot ${botName} not found`)
    const chatsAtom = React.useMemo(
        () =>
            atom((get) => {
                return bot.chats.map((id) => {
                    const item = get(chatsDb.item(id))
                    invariant(item, `Chat ${id} not found`)
                    return item
                })
            }),
        [bot.chats],
    )

    return useAtomValue(chatsAtom)
}

export const useSortedChats = (botName: string) => {
    const chatsMeta = useChats(botName)
    return React.useMemo(() => sortBy((chat) => -chat.updatedAt, chatsMeta), [chatsMeta])
}

export const useFirstChatMeta = (botName: string) => {
    return useSortedChats(botName)[0]
}
