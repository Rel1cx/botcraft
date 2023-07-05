import { Chat as ChatIcon, ChatDots } from "@phosphor-icons/react"
import { Option as O } from "@swan-io/boxed"
import { produce } from "immer"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { sortBy } from "rambda"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import invariant from "tiny-invariant"
import { match, P } from "ts-pattern"

import type { MessageData } from "@/bot"
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
import { draftsDb, messagesDb } from "@/stores/db"
import { vars } from "@/theme/vars.css"
import { type ChatID, isChatID, makeMessageID, type MessageID } from "@/zod/id"

import { Layout } from "../Layout/Layout"
import * as css from "./styles.css"

const Message = React.lazy(() => import("@/components/Message/Message"))

const ChatList = React.lazy(() => import("@/components/ChatList/ChatList"))

const ConfirmDialog = React.lazy(() => import("@/components/atoms/ConfirmDialog/ConfirmDialog"))

const MessageEditor = React.lazy(() => import("@/components/MessageEditor/MessageEditor"))

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
    const setDraft = useSetAtom(draftsDb.set)
    const removeMessage = useSetAtom(removeMessageAtom)
    const updateChatCompletion = useSetAtom(updateChatCompletionAtom)

    const handleRemoveClick = React.useCallback(() => {
        void removeMessage(chatID, id)
    }, [chatID, id, removeMessage])

    const handleRegenerateClick = React.useCallback(() => {
        match(data)
            .with({ role: "assistant" }, () => {
                void updateChatCompletion(botName, chatID, id)
            })
            .with({ role: "user" }, (data) => {
                void setDraft(chatID, {
                    messageID: O.Some(id),
                    content: data.content,
                })
            })
            .run()
    }, [botName, chatID, data, id, setDraft, updateChatCompletion])

    if (!data) {
        return null
    }

    if (data.role === "system") {
        return null
    }

    return (
        <React.Suspense>
            <Message data={data} onRemoveClick={handleRemoveClick} onRegenerateClick={handleRegenerateClick} />
        </React.Suspense>
    )
})

type MessageEditorPresenterProps = {
    botName: string
    chatID: ChatID
}

const MessageEditorPresenter = React.memo(({ botName, chatID }: MessageEditorPresenterProps) => {
    const messageEditorRef = React.useRef<HTMLInputElement>(null)
    const deleteDraft = useSetAtom(draftsDb.delete)
    const addMessage = useSetAtom(addMessageAtom)
    const setMessage = useSetAtom(messagesDb.set)
    const requestChatCompletion = useSetAtom(updateChatCompletionAtom)
    const [key, setKey] = React.useState(0)
    const [draft, setDraft] = useAtom(draftsDb.item(chatID))
    const content = draft?.content ?? ""
    const messageID = draft?.messageID ?? O.None()

    const updateMessage = React.useCallback(
        (messageID: MessageID, content: string) => {
            return setMessage(messageID, (prev) => {
                invariant(prev, "message not found")
                return {
                    ...prev,
                    content,
                }
            })
        },
        [setMessage],
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

    const handleChange = React.useCallback(
        (value: string) => {
            match(value)
                .with("", () => {
                    void deleteDraft(chatID)
                })
                .with(P.string, () => {
                    void setDraft({
                        content: value,
                        messageID,
                    })
                })
                .exhaustive()
        },
        [chatID, deleteDraft, messageID, setDraft],
    )

    useHotkeys(
        "ctrl+enter",
        async (evt) => {
            invariant(draft, "draft not found")
            const { target } = evt
            const container = messageEditorRef.current
            if (!container || !target || !isContainTarget(target, container)) {
                return
            }

            const trimmedContent = content.trim()

            if (!trimmedContent) {
                return
            }

            evt.preventDefault()

            await deleteDraft(chatID)
            setKey((prev) => prev + 1)

            await messageID.match({
                None: async () => {
                    await onMessageCreate(trimmedContent)
                },
                Some: async (messageID) => {
                    await updateMessage(messageID, trimmedContent)
                },
            })
        },
        {
            enableOnContentEditable: true,
        },
    )

    return <MessageEditor key={key} ref={messageEditorRef} content={content} onChange={handleChange} />
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
    const addChat = useSetAtom(addChatAtom)
    const removeChat = useSetAtom(removeChatAtom)
    const chatCompletionTask = useAtomValue(chatCompletionTaskAtom)
    const [chat, setChat] = useChat(chatID)
    const [removing, setRemoving] = React.useState(O.None<ChatID>())

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
                    onAddChatClick={onAddChatClick}
                    onRemoveChatClick={(id) => {
                        if (!isChatID(id)) {
                            return
                        }
                        setRemoving(O.Some(id))
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
                <MessageEditorPresenter botName={botName} chatID={chatID} />
            </div>
            <ConfirmDialog
                title="Remove chat"
                description="Are you sure you want to remove this chat?"
                confirmLabel="Remove"
                danger
                open={removing.isSome()}
                onClose={() => {
                    setRemoving(O.None())
                }}
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
