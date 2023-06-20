import { useAtomValue, useSetAtom } from "jotai"
import { useTransientAtom } from "jotai-game"
import * as React from "react"
import invariant from "tiny-invariant"

import { addBotAtom, botsAtom, removeBotAtom, updateBotAtom } from "@/atoms"
import { estimateTokenCount } from "@/bots/builtins/ChatGPT"
import type { MessageData } from "@/bots/builtins/types"
import type { ChatID, MessageID } from "@/zod/id"

import {
    addChatAtom,
    addMessageAtom,
    removeChatAtom,
    removeMessageAtom,
    updateChatAtom,
    updateMessageAtom,
} from "./bot/atoms"
import { chatsDb, messagesDb } from "./db"

export const useApp = () => {
    const bots = useAtomValue(botsAtom)
    const addBot = useSetAtom(addBotAtom)
    const removeBot = useSetAtom(removeBotAtom)
    const updateBot = useSetAtom(updateBotAtom)

    const methods = React.useMemo(
        () => ({
            addBot,
            removeBot,
            updateBot,
        }),
        [addBot, removeBot, updateBot],
    )

    return [bots, methods] as const
}

export const useBot = (botName: string) => {
    const bots = useAtomValue(botsAtom)
    const addChat = useSetAtom(addChatAtom)
    const updateChat = useSetAtom(updateChatAtom)
    const removeChat = useSetAtom(removeChatAtom)

    const bot = React.useMemo(() => bots.find((bot) => bot.name === botName), [bots, botName])

    invariant(bot, `Bot ${botName} not found`)

    const methods = React.useMemo(
        () => ({
            addChat,
            updateChat,
            removeChat,
        }),
        [addChat, removeChat, updateChat],
    )

    return [bot, methods] as const
}

export const useChat = (id: ChatID) => {
    const chat = useAtomValue(chatsDb.item(id))
    const updateMessage = useSetAtom(updateMessageAtom)
    const addMessage = useSetAtom(addMessageAtom)
    const removeMessage = useSetAtom(removeMessageAtom)

    const methods = React.useMemo(
        () => ({
            updateMessage,
            addMessage,
            removeMessage,
        }),
        [addMessage, removeMessage, updateMessage],
    )

    return [chat, methods] as const
}

export const useMessage = (id: MessageID) => {
    return useAtomValue(messagesDb.item(id))
}

export const useChatTokens = (botName: string, chatID: ChatID) => {
    const [bot] = useBot(botName)
    const [chat] = useChat(chatID)
    const [getMessages] = useTransientAtom(messagesDb.items)

    return React.useMemo(() => {
        const allMessages = getMessages()

        if (!chat?.messages || !allMessages) {
            return 0
        }

        const messageList = chat.messages.reduce<MessageData[]>((acc, id) => {
            const message = allMessages[id]
            if (message) {
                acc.push(message)
            }
            return acc
        }, [])

        return estimateTokenCount(messageList)(bot)
    }, [bot, chat?.messages, getMessages])
}
