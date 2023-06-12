import { atom, useAtom } from "jotai"
import { useTransientAtom } from "jotai-game"
import { useMemo } from "react"

import { defaultBot } from "@/bots"
import type { MessageData } from "@/bots/builtins/types"
import type { StampID } from "@/lib/uuid"
import { messagesAtom } from "@/stores"

import { chatsAtom } from "./bot/atoms"

export const useChat = (id: StampID) => {
    return useAtom(useMemo(() => atom((get) => get(chatsAtom).get(id)), [id]))
}

export const useMessage = (id: StampID) => {
    return useAtom(useMemo(() => atom((get) => get(messagesAtom).get(id)), [id]))
}

export const useChatTokens = (chatID: StampID) => {
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

        return defaultBot.estimateTokenCount(messageList)
    }, [chat?.messages, getMessages])
}
