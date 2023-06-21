import { Chat as ChatIcon } from "@phosphor-icons/react"
import { Option as O } from "@swan-io/boxed"
import { produce } from "immer"
import { useAtomValue, useSetAtom } from "jotai"
import { sortBy } from "rambda"
import * as React from "react"
import invariant from "tiny-invariant"

import type { MessageData } from "@/bots/builtins/types"
import Icon from "@/components/atoms/Icon/Icon"
import Redirect from "@/components/atoms/Redirect/Redirect"
import TitleInput from "@/components/atoms/TitleInput/TitleInput"
import Chat from "@/components/Chat/Chat"
import { Router } from "@/router"
import {
    addChatAtom,
    addMessageAtom,
    chatCompletionTaskAtom,
    removeChatAtom,
    requestChatCompletionAtom,
    useChat,
    useMessage,
} from "@/stores"
import { useChatsMeta } from "@/stores/hooks"
import { vars } from "@/theme/vars.css"
import type { ChatItem } from "@/types"
import { type ChatID, isChatID, makeMessageID, type MessageID } from "@/zod/id"

import { Layout } from "../Layout/Layout"
import * as css from "./styles.css"

const TimeStack = React.lazy(() => import("@/components/TimeStack/TimeStack"))

const Message = React.lazy(() => import("@/components/atoms/Message/Message"))

const ConfirmDialog = React.lazy(() => import("@/components/atoms/ConfirmDialog/ConfirmDialog"))

const ChatMessageEditor = React.lazy(() => import("@/components/ChatMessageEditor/ChatMessageEditor"))

type ChatDetailProps = {
    botName: string
    chatID: ChatID
}

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
}

type AsideProps = {
    botName: string
    selectedChatID: string
    isGenerating: boolean
    onAddChatClick: () => void
    onRemoveChatClick: (id: string) => void
}

const Aside = ({ botName, isGenerating, onAddChatClick, onRemoveChatClick, selectedChatID }: AsideProps) => {
    const chatsMeta = useChatsMeta(botName)

    const sortedChats = React.useMemo(() => sortBy((chat) => -chat.updatedAt, chatsMeta), [chatsMeta])

    return (
        <TimeStack
            items={sortedChats}
            renderItemIcon={(id) => (
                <Icon
                    style={{
                        flexShrink: 0,
                    }}
                    as={ChatIcon}
                    color={selectedChatID === id ? "#fff" : vars.colors.text}
                />
            )}
            newItemName="New chat"
            selected={selectedChatID}
            disableMutation={isGenerating}
            onItemClick={(id) => {
                Router.push("BotChat", { botName, chatID: id })
            }}
            onItemAdd={onAddChatClick}
            onItemRemove={onRemoveChatClick}
        />
    )
}

const ChatMessageRenderer = React.memo(({ id }: { id: MessageID }) => {
    const [data] = useMessage(id)

    const content = React.useMemo(() => {
        if (!data?.content || data.role === "system") {
            return null
        }

        return <Message data={data} />
    }, [data])

    return <React.Suspense>{content}</React.Suspense>
})

const ChatDetail = React.memo(({ botName, chatID }: ChatDetailProps) => {
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [chat, setChat] = useChat(chatID)
    const addChat = useSetAtom(addChatAtom)
    const removeChat = useSetAtom(removeChatAtom)
    const addMessage = useSetAtom(addMessageAtom)
    const [removing, setRemoving] = React.useState(O.None<ChatID>())
    const requestChatCompletion = useSetAtom(requestChatCompletionAtom)

    const chatCompletionTask = useAtomValue(chatCompletionTaskAtom)

    const isGenerating = React.useMemo(() => {
        if (chatCompletionTask.isNone()) {
            return false
        }

        const task = chatCompletionTask.get()

        return task.type === "pending" && task.chatID === chatID
    }, [chatCompletionTask, chatID])

    const onAddChatClick = React.useCallback(() => {
        void addChat(botName)
    }, [addChat, botName])

    const onChatRemoveClick = React.useCallback(
        (chatID: ChatID) => {
            Router.replace("BotNewChat", { botName })
            void removeChat(botName, chatID)
        },
        [botName, removeChat],
    )

    const onMessageCreate = React.useCallback(
        async (content: string) => {
            const message: MessageData = {
                id: makeMessageID(),
                content,
                role: "user",
                updatedAt: Date.now(),
            }
            await addMessage(chatID, message)

            await requestChatCompletion(botName, chatID)
        },
        [addMessage, botName, chatID, requestChatCompletion],
    )

    if (!chat) {
        return <Redirect to={`/bots/${botName}/new`} />
    }

    return (
        <Layout
            asideHeader={botName}
            aside={
                <Aside
                    botName={botName}
                    selectedChatID={chatID}
                    isGenerating={isGenerating}
                    onAddChatClick={onAddChatClick}
                    onRemoveChatClick={(id) => {
                        if (isChatID(id)) {
                            setRemoving(O.Some(id))
                        }
                    }}
                />
            }
            header={
                <TitleInput
                    id="chat-title"
                    value={chat.title}
                    placeholder="Untitled"
                    onChange={(evt) => {
                        void setChat(
                            produce((draft) => {
                                invariant(draft, "Chat must be defined")
                                draft.title = evt.target.value
                            }),
                        )
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
})

export default ChatDetail
