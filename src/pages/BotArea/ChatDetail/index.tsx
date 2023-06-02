import { produce } from "immer"
import { useAtomValue, useSetAtom } from "jotai"
import { lazy, useRef } from "react"
import useEvent from "react-use-event-hook"

import TitleInput from "@/components/atoms/TitleInput"
import { UUIDStamp } from "@/lib/uuid"
import { Router } from "@/router"
import type { MessageItem } from "@/stores"
import {
    addChatAtom,
    addMessageAtom,
    chatCompletionTaskAtom,
    DEFAULT_CHAT_COMPLETION_OPTIONS,
    DEFAULT_SYSTEM_MESSAGE,
    EMPTY_CHAT_ITEM,
    removeChatAtom,
    requestChatCompletionAtom,
    updateChatAtom,
    useChat,
    useChatList,
} from "@/stores"

import { Layout } from "../Layout"
import Chat from "./components/Chat"
import * as css from "./styles.css"

const TimeStack = lazy(() => import("@/components/TimeStack"))
const MarkdownEditor = lazy(() => import("@/components/atoms/MarkdownEditor"))

type ChatDetailProps = {
    botName: string
    chatID: UUIDStamp
}

const ChatDetail = ({ botName, chatID }: ChatDetailProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [chat] = useChat(chatID)
    const addMessage = useSetAtom(addMessageAtom)
    const addChat = useSetAtom(addChatAtom)
    const updateChat = useSetAtom(updateChatAtom)
    const removeChat = useSetAtom(removeChatAtom)
    // const toggleChat = useSetAtom(toggleChatAtom)
    const requestChatCompletion = useSetAtom(requestChatCompletionAtom)

    const chatCompletionTask = useAtomValue(chatCompletionTaskAtom)

    const isGenerating = chatCompletionTask.isSome() && chatCompletionTask.get().type === "pending"

    const onAddChatClick = useEvent(() => {
        const preCreatedMessage: MessageItem = {
            id: UUIDStamp(),
            role: "system",
            content: DEFAULT_SYSTEM_MESSAGE,
            updatedAt: Date.now(),
        }

        const newChat = produce(EMPTY_CHAT_ITEM, (draft) => {
            draft.id = UUIDStamp()
            draft.messages.push(preCreatedMessage.id)
        })

        addMessage(preCreatedMessage)
        addChat(newChat)
    })

    const onChatRemoveClick = useEvent(() => {
        Router.push("BotNewChat", { botName })
        removeChat(chatID)
    })

    const onMessageCreate = useEvent(async (content: string) => {
        const message: MessageItem = {
            id: UUIDStamp(),
            content,
            role: "user",
            updatedAt: Date.now(),
        }
        addMessage(message)
        updateChat(chatID, (draft) => {
            draft.messages.push(message.id)
        })

        const result = await requestChatCompletion(chatID, DEFAULT_CHAT_COMPLETION_OPTIONS)

        console.debug(result)
    })

    const shouldSend = useEvent((value: string) => value.trim() !== "" && !isGenerating)

    const data = useChatList()

    return (
        <Layout
            asideHeader={botName}
            aside={
                <TimeStack
                    items={data}
                    newItemName="New chat"
                    selected={chatID}
                    onItemAdd={onAddChatClick}
                    onItemRemove={onChatRemoveClick}
                />
            }
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
                    onHeightChange={() => {
                        contentRef.current?.scrollTo({
                            top: contentRef.current.scrollHeight,
                        })
                    }}
                />
            </div>
            <div className={css.bottom}>
                <MarkdownEditor onComplete={onMessageCreate} shouldComplete={shouldSend} />
            </div>
        </Layout>
    )
}

export default ChatDetail
