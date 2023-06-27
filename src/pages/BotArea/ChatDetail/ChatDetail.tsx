import { Chat as ChatIcon } from "@phosphor-icons/react"
import { Option as O } from "@swan-io/boxed"
import { produce } from "immer"
import { useAtomValue, useSetAtom } from "jotai"
import { sortBy } from "rambda"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import invariant from "tiny-invariant"

import type { MessageData } from "@/bot/types"
import Icon from "@/components/atoms/Icon/Icon"
import TitleInput from "@/components/atoms/TitleInput/TitleInput"
import Chat from "@/components/Chat/Chat"
import { isContainTarget } from "@/lib/browser"
import { Router } from "@/router"
import {
    addChatAtom,
    addMessageAtom,
    chatCompletionTaskAtom,
    removeChatAtom,
    removeMessageAtom,
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

const ChatList = React.lazy(() => import("@/components/ChatList/ChatList"))

const Message = React.lazy(() => import("@/components/Message/Message"))

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
        <ChatList
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

const ChatMessagePresenter = React.memo(({ chatID, id }: { chatID: ChatID; id: MessageID }) => {
    const [data] = useMessage(id)
    const removeMessage = useSetAtom(removeMessageAtom)

    if (!data) {
        return null
    }

    if (data.role === "system") {
        return null
    }

    return (
        <React.Suspense>
            <Message data={data} onRemoveClick={() => removeMessage(chatID, id)} />
        </React.Suspense>
    )
})

const ChatDetail = React.memo(({ botName, chatID }: ChatDetailProps) => {
    const contentRef = React.useRef<HTMLDivElement>(null)
    const messageEditorRef = React.useRef<HTMLInputElement>(null)
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
        async (chatID: ChatID) => {
            await removeChat(botName, chatID)
            Router.replace("BotNewChat", { botName })
        },
        [botName, removeChat],
    )

    const onMessageChange = React.useCallback(
        async (content: string) => {
            await setChat(
                produce((draft) => {
                    invariant(draft, "Chat must be defined")
                    draft.draft = content
                }),
            )
        },
        [setChat],
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

    useHotkeys(
        "ctrl+enter",
        async (evt) => {
            const { target } = evt
            const container = messageEditorRef.current
            if (!container || !target || !isContainTarget(target, container)) {
                return
            }

            const content = chat?.draft.trim()
            if (!content) {
                return
            }
            evt.preventDefault()
            await onMessageChange("")
            await onMessageCreate(content)
        },
        {
            enableOnContentEditable: true,
        },
    )

    if (!chat) {
        return null
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
                    MessageComponent={ChatMessagePresenter}
                    onHeightChange={() => {
                        contentRef.current?.scrollTo({
                            top: contentRef.current.scrollHeight,
                        })
                    }}
                />
            </div>
            <div className={css.bottom}>
                <ChatMessageEditor ref={messageEditorRef} content={chat.draft} onChange={onMessageChange} />
            </div>
            <ConfirmDialog
                title="Remove chat"
                description="Are you sure you want to remove this chat?"
                confirmLabel="Remove"
                danger
                open={removing.isSome()}
                onClose={() => setRemoving(O.None())}
                onConfirm={async () => {
                    if (removing.isNone()) {
                        return
                    }
                    await onChatRemoveClick(removing.get())
                    setRemoving(O.None())
                }}
            />
        </Layout>
    )
})

export default ChatDetail
