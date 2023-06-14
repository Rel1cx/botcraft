import { atom, useAtom, useAtomValue } from "jotai"
import { useTransientAtom } from "jotai-game"
import { useMemo } from "react"

import type { MessageData } from "@/bots/builtins/types"
import type { StampID } from "@/lib/uuid"
import { messagesAtom } from "@/stores"

import { chatsAtom, defaultBotAtom } from "./bot/atoms"

export const useChat = (id: StampID) => {
    return useAtom(useMemo(() => atom((get) => get(chatsAtom).get(id)), [id]))
}

export const useMessage = (id: StampID) => {
    return useAtom(useMemo(() => atom((get) => get(messagesAtom).get(id)), [id]))
}

export const useChatTokens = (chatID: StampID) => {
    const bot = useAtomValue(defaultBotAtom)
    const [chat] = useChat(chatID)
    const [getMessages] = useTransientAtom(messagesAtom)

    return useMemo(() => {
        const messageList =
            chat?.messages.reduce<MessageData[]>((acc, id) => {
                const message = getMessages().get(id)
                if (message) {
                    acc.push(message)
                }
                return acc
            }, []) ?? []

        return bot.estimateTokenCount(messageList)
    }, [bot, chat?.messages, getMessages])
}
