import { Chat as ChatIcon } from "@phosphor-icons/react"
import { Option as O } from "@swan-io/boxed"
import { useAtomValue, useSetAtom } from "jotai"
import { useTransientAtom } from "jotai-game"
import { lazy, memo, Suspense, useCallback, useMemo, useRef, useState } from "react"

import type { ChatItem } from "@/atoms"
import {
    chatCompletionTaskAtom,
    chatsAtom,
    requestChatCompletionAtom,
    sortedChatsAtom,
    useBot,
    useChat,
    useMessage,
} from "@/atoms"
import type { MessageData } from "@/bots/builtins/types"
import Icon from "@/components/atoms/Icon/Icon"
import Redirect from "@/components/atoms/Redirect/Redirect"
import TitleInput from "@/components/atoms/TitleInput/TitleInput"
import Chat from "@/components/Chat/Chat"
import type { StampID } from "@/lib/uuid"
import { isStampID, makeID } from "@/lib/uuid"
import { Router } from "@/router"
import { vars } from "@/theme/vars.css"

import { Layout } from "../Layout/Layout"
import * as css from "./styles.css"

const TimeStack = lazy(() => import("@/components/TimeStack/TimeStack"))

const Message = lazy(() => import("@/components/atoms/Message/Message"))

const ConfirmDialog = lazy(() => import("@/components/atoms/ConfirmDialog/ConfirmDialog"))

const ChatMessageEditor = lazy(() => import("@/components/ChatMessageEditor/ChatMessageEditor"))

type ChatDetailProps = {
    botName: string
    chatID: StampID
}

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
}

const ChatMessageRenderer = memo(({ id }: { id: StampID }) => {
    const [data] = useMessage(id)

    const content = useMemo(() => {
        if (!data?.content || data.role === "system") {
            return null
        }

        return <Message data={data} />
    }, [data])

    return <Suspense>{content}</Suspense>
})

const ChatDetail = ({ botName, chatID }: ChatDetailProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [bot] = useBot()
    const [chat, { addChat, removeChat, updateChat }] = useChat(chatID)
    const [, { addMessage }] = useMessage(chatID)
    const [getChats] = useTransientAtom(chatsAtom)
    const sortedChats = useAtomValue(sortedChatsAtom)
    const [removing, setRemoving] = useState(O.None<StampID>())
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
        const newChat = bot.initChat()
        addChat(newChat)
    }, [addChat, bot])

    const onChatRemoveClick = useCallback(
        (chatID: string) => {
            const chats = getChats()
            const isLast = chats.size === 1
            // TODO: Allow safe removal of last chat
            if (isLast || !isStampID(chatID)) {
                return
            }
            Router.replace("BotNewChat", { botName })
            removeChat(chatID)
        },
        [botName, getChats, removeChat],
    )

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
                renderItemIcon={(id) => (
                    <Icon
                        style={{
                            flexShrink: 0,
                        }}
                        as={ChatIcon}
                        color={chatID === id ? "#fff" : vars.colors.text}
                    />
                )}
                newItemName="New chat"
                selected={chatID}
                disableMutation={isGenerating}
                onItemClick={(id) => {
                    Router.push("BotChat", { botName, chatID: id })
                }}
                onItemAdd={onAddChatClick}
                onItemRemove={(id) => {
                    if (isStampID(id)) {
                        setRemoving(O.Some(id))
                    }
                }}
            />
        ),
        [botName, chatID, isGenerating, onAddChatClick, sortedChats],
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
            <ConfirmDialog
                title="Remove chat"
                description="Are you sure you want to remove this chat?"
                confirmLabel="Remove"
                danger
                open={removing.isSome()}
                onClose={() => setRemoving(O.None())}
                onConfirm={() => {
                    if (removing.isNone()) {
                        return
                    }
                    onChatRemoveClick(removing.get())
                    setRemoving(O.None())
                }}
            />
        </Layout>
    )
}

export default ChatDetail
