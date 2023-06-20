import { useAtom, useAtomValue } from "jotai"
import * as React from "react"

import { botsAtom } from "@/atoms"
import type { ChatID, MessageID } from "@/zod/id"

import { chatsDb, messagesDb } from "./db"

export const useBot = (name: string) => {
    const bots = useAtomValue(botsAtom)
    return React.useMemo(() => bots.find((bot) => bot.name === name), [bots, name])
}

export const useChat = (id: ChatID) => {
    return useAtom(chatsDb.item(id))
}

export const useMessage = (id: MessageID) => {
    return useAtom(messagesDb.item(id))
}

// export const useChatTokens = (botName: string, chatID: ChatID) => {
//     const [bot] = useBot(botName)
//     const [chat] = useChat(chatID)
//     const [getMessages] = useTransientAtom(messagesDb.items)

//     return React.useMemo(() => {
//         const allMessages = getMessages()

//         if (!chat?.messages || !allMessages) {
//             return 0
//         }

//         const messageList = chat.messages.reduce<MessageData[]>((acc, id) => {
//             const message = allMessages[id]
//             if (message) {
//                 acc.push(message)
//             }
//             return acc
//         }, [])

//         return estimateTokenCount(messageList)(bot)
//     }, [bot, chat?.messages, getMessages])
// }
