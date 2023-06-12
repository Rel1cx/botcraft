import { useAtomValue, useSetAtom } from "jotai"
import { useTransientAtom } from "jotai-game"
import { MessageSquare } from "lucide-react"
import { lazy, Suspense, useCallback, useMemo, useRef } from "react"

import type { MessageData } from "@/bots/builtins/types"
import { defaultBot } from "@/bots/index"
import Icon from "@/components/atoms/Icon"
import Redirect from "@/components/atoms/Redirect"
import TitleInput from "@/components/atoms/TitleInput"
import Chat from "@/components/Chat"
import { ChatMessageEditor } from "@/components/ChatMessgeEditor"
import type { StampID } from "@/lib/uuid"
import { makeID } from "@/lib/uuid"
import { Router } from "@/router"
import type { ChatItem } from "@/stores"
import {
    addChatAtom,
    addMessageAtom,
    chatCompletionTaskAtom,
    chatsAtom,
    removeChatAtom,
    requestChatCompletionAtom,
    sortedChatsAtom,
    updateChatAtom,
    useChat,
    useMessage,
} from "@/stores"
import { vars } from "@/theme/vars.css"

import { Layout } from "../Layout"
import * as css from "./styles.css"

const TimeStack = lazy(() => import("@/components/TimeStack"))

const Message = lazy(() => import("@/components/atoms/Message"))

type ChatDetailProps = {
    botName: string
    chatID: StampID
}

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
}

const ChatMessageRenderer = ({ id }: { id: StampID }) => {
    const [data] = useMessage(id)

    return <Suspense>{data ? <Message data={data} /> : null}</Suspense>
}

const ChatDetail = ({ botName, chatID }: ChatDetailProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [chat] = useChat(chatID)
    const [getChats] = useTransientAtom(chatsAtom)
    const sortedChats = useAtomValue(sortedChatsAtom)
    const addMessage = useSetAtom(addMessageAtom)
    const addChat = useSetAtom(addChatAtom)
    const updateChat = useSetAtom(updateChatAtom)
    const removeChat = useSetAtom(removeChatAtom)
    // const toggleChat = useSetAtom(toggleChatAtom)
    const requestChatCompletion = useSetAtom(requestChatCompletionAtom)

    const chatCompletionTask = useAtomValue(chatCompletionTaskAtom)

    const isGenerating = useMemo(() => {
        if (chatCompletionTask.isNone()) {
            return false
        }

        const task = chatCompletionTask.get()

        return task.type === "pending" && task.chatID === chatID
    }, [chatCompletionTask, chatID])

    const onAddChatClick = useCallback(() => {
        const newChat = defaultBot.initChat()
        addChat(newChat)
    }, [addChat])

    const onChatRemoveClick = useCallback(() => {
        const chats = getChats()
        const isLast = chats.size === 1
        // TODO: Allow safe removal of last chat
        if (isLast) {
            return
        }
        Router.replace("BotNewChat", { botName })
        removeChat(chatID)
    }, [botName, chatID, getChats, removeChat])

    const onMessageCreate = useCallback(
        (content: string) => {
            const message: MessageData = {
                id: makeID(),
                content,
                role: "user",
                updatedAt: Date.now(),
            }
            addMessage(message)
            updateChat(chatID, (draft) => {
                draft.messages.push(message.id)
            })

            void requestChatCompletion(chatID)
        },
        [addMessage, chatID, requestChatCompletion, updateChat],
    )

    const aside = useMemo(
        () => (
            <TimeStack
                items={sortedChats}
                itemIcon={(id) => <Icon as={MessageSquare} color={chatID === id ? "#fff" : vars.colors.text} />}
                newItemName="New chat"
                selected={chatID}
                disableMutation={isGenerating}
                onItemAdd={onAddChatClick}
                onItemRemove={onChatRemoveClick}
            />
        ),
        [chatID, isGenerating, onAddChatClick, onChatRemoveClick, sortedChats],
    )

    if (!chat) {
        return <Redirect to={`/bots/${botName}/new`} />
    }

    return (
        <Layout
            asideHeader={botName}
            aside={aside}
            header={
                <TitleInput
                    id="chat-title"
                    value={chat.title}
                    placeholder="Untitled"
                    onChange={(evt) => {
                        updateChat(chatID, (draft) => {
                            draft.title = evt.currentTarget.value
                        })
                    }}
                />
            }
        >
            <div ref={contentRef} className={css.content}>
                <Chat
                    data={chat}
                    isGenerating={isGenerating}
                    MessageRenderer={ChatMessageRenderer}
                    onHeightChange={() => {
                        contentRef.current?.scrollTo({
                            top: contentRef.current.scrollHeight,
                        })
                    }}
                />
            </div>
            <div className={css.bottom}>
                <ChatMessageEditor id={chatID} onComplete={onMessageCreate} shouldSend={!isGenerating} />
            </div>
        </Layout>
    )
}

export default ChatDetail
