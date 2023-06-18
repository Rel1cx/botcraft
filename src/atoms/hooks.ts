import { atom, useAtom, useAtomValue, useSetAtom, useStore } from "jotai"
import { useTransientAtom } from "jotai-game"
import * as React from "react"

import { botAtom, messagesAtom } from "@/atoms"
import type { MessageData } from "@/bots/builtins/types"
import type { StampID } from "@/lib/uuid"

import { addChatAtom, addMessageAtom, chatsAtom, removeChatAtom, updateChatAtom } from "./bot/atoms"

export const useBot = () => {
    const store = useStore()
    return useAtom(botAtom, { store })
}

export const useChat = (id: StampID) => {
    const store = useStore()
    const chatAtom = React.useMemo(() => atom((get) => get(chatsAtom).get(id)), [id])
    const chat = useAtomValue(chatAtom, { store })
    const addChat = useSetAtom(addChatAtom, { store })
    const updateChat = useSetAtom(updateChatAtom, { store })
    const removeChat = useSetAtom(removeChatAtom, { store })

    return [
        chat,
        {
            addChat,
            updateChat,
            removeChat,
        },
    ] as const
}

export const useMessage = (id: StampID) => {
    const store = useStore()
    const messageAtom = React.useMemo(() => atom((get) => get(messagesAtom).get(id)), [id])

    const [message, setMessage] = useAtom(messageAtom, { store })
    const addMessage = useSetAtom(addMessageAtom, { store })

    return [message, { setMessage, addMessage }] as const
}

export const useChatTokens = (chatID: StampID) => {
    const [bot] = useBot()
    const [chat] = useChat(chatID)
    const [getMessages] = useTransientAtom(messagesAtom)

    return React.useMemo(() => {
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
