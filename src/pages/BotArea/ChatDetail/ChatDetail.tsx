import { Chat as ChatIcon, ChatDots } from "@phosphor-icons/react"
import { Option as O } from "@swan-io/boxed"
import { produce } from "immer"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
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
    updateChatCompletionAtom,
    useChat,
    useChats,
    useMessage,
} from "@/stores"
import { draftsDb } from "@/stores/db"
import { vars } from "@/theme/vars.css"
import { type ChatID, isChatID, makeMessageID, type MessageID } from "@/zod/id"

import { Layout } from "../Layout/Layout"
import * as css from "./styles.css"

const Message = React.lazy(() => import("@/components/Message/Message"))

const ChatList = React.lazy(() => import("@/components/ChatList/ChatList"))

const ConfirmDialog = React.lazy(() => import("@/components/atoms/ConfirmDialog/ConfirmDialog"))

const ChatMessageEditor = React.lazy(() => import("@/components/ChatMessageEditor/ChatMessageEditor"))

type ChatDetailProps = {
    botName: string
    chatID: ChatID
}

type ChatIconPresenterProps = {
    id: ChatID
    selected: boolean
}

const ChatIconPresenter = React.memo(({ id, selected }: ChatIconPresenterProps) => {
    const [chat] = useChat(id)

    const messageLength = chat?.messages.length ?? 0

    const color = selected ? "#fff" : vars.colors.text

    return (
        <Icon
            style={{
                flexShrink: 0,
            }}
            as={messageLength > 1 ? ChatDots : ChatIcon}
            color={color}
        />
    )
})

type ChatMessagePresenterProps = {
    botName: string
    chatID: ChatID
    id: MessageID
}

const ChatMessagePresenter = React.memo(({ botName, chatID, id }: ChatMessagePresenterProps) => {
    const [data] = useMessage(id)
    const removeMessage = useSetAtom(removeMessageAtom)
    const updateChatCompletion = useSetAtom(updateChatCompletionAtom)

    if (!data) {
        return null
    }

    if (data.role === "system") {
        return null
    }

    return (
        <React.Suspense>
            <Message
                data={data}
                onRemoveClick={() => removeMessage(chatID, id)}
                onRegenerateClick={() => {
                    if (data.role !== "assistant") {
                        return
                    }

                    void updateChatCompletion(botName, chatID, id)
                }}
            />
        </React.Suspense>
    )
})

type ChatMessageEditorPresenterProps = {
    chatID: ChatID
    onCompleted?: (content: string) => void
}

const ChatMessageEditorPresenter = React.memo(({ chatID, onCompleted }: ChatMessageEditorPresenterProps) => {
    const messageEditorRef = React.useRef<HTMLInputElement>(null)
    const [key, setKey] = React.useState(0)
    const [draft = "", setDraft] = useAtom(draftsDb.item(chatID))
    const deleteDraft = useSetAtom(draftsDb.delete)

    useHotkeys(
        "ctrl+enter",
        async (evt) => {
            const { target } = evt
            const container = messageEditorRef.current
            if (!container || !target || !isContainTarget(target, container)) {
                return
            }

            const content = draft.trim()

            if (!content) {
                return
            }
            evt.preventDefault()
            await deleteDraft(chatID)
            onCompleted?.(content)
            setKey((prev) => prev + 1)
        },
        {
            enableOnContentEditable: true,
        },
    )

    return <ChatMessageEditor key={key} ref={messageEditorRef} content={draft} onChange={setDraft} />
})

type AsideProps = {
    botName: string
    selectedChatID: ChatID
    onAddChatClick: () => void
    onRemoveChatClick: (id: string) => void
}

const Aside = ({ botName, onAddChatClick, onRemoveChatClick, selectedChatID }: AsideProps) => {
    const chatsMeta = useChats(botName)

    const sortedChats = React.useMemo(() => sortBy((chat) => -chat.updatedAt, chatsMeta), [chatsMeta])

    return (
        <ChatList
            items={sortedChats}
            renderItemIcon={(id) => (
                <ChatIconPresenter
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    id={id as ChatID}
                    selected={id === selectedChatID}
                />
            )}
            newItemName="New chat"
            selected={selectedChatID}
            onItemClick={(id) => {
                Router.push("BotChat", { botName, chatID: id })
            }}
            onItemAdd={onAddChatClick}
            onItemRemove={onRemoveChatClick}
        />
    )
}

const ChatDetail = React.memo(({ botName, chatID }: ChatDetailProps) => {
    const [chat, setChat] = useChat(chatID)
    const addChat = useSetAtom(addChatAtom)
    const removeChat = useSetAtom(removeChatAtom)
    const addMessage = useSetAtom(addMessageAtom)
    const [removing, setRemoving] = React.useState(O.None<ChatID>())
    const requestChatCompletion = useSetAtom(updateChatCompletionAtom)

    const chatCompletionTask = useAtomValue(chatCompletionTaskAtom)

    const isGenerating = chatCompletionTask[chatID]?.type === "pending"

    const generatingMessageID = React.useMemo<O<MessageID>>(() => {
        if (!isGenerating) {
            return O.None()
        }

        return O.fromNullable(chatCompletionTask[chatID]?.messageID)
    }, [chatCompletionTask, chatID, isGenerating])

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

    invariant(chat, "Chat must be defined")

    return (
        <Layout
            asideHeader={botName}
            aside={
                <Aside
                    botName={botName}
                    selectedChatID={chatID}
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
            <Chat
                className={css.content}
                data={chat}
                generatingMessageID={generatingMessageID}
                renderMessage={(id: MessageID) => <ChatMessagePresenter botName={botName} id={id} chatID={chatID} />}
            />
            <div className={css.bottom}>
                <ChatMessageEditorPresenter chatID={chatID} onCompleted={onMessageCreate} />
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
