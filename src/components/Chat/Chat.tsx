import { useResizeObserver } from "@react-hookz/web"
import { AnimatePresence, m } from "framer-motion"
import * as React from "react"

import type { MessageData } from "@/bot/types"
import type { ChatItem } from "@/types"
import type { ChatID, MessageID } from "@/zod/id"
import { makeMessageID } from "@/zod/id"

import * as css from "./styles.css"

const Message = React.lazy(() => import("@/components/Message/Message"))

const Animation = React.lazy(() => import("@/components/atoms/Animation/Animation"))

export type MessageComponentProps = {
    chatID: ChatID
    id: MessageID
    className?: string
}

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
    MessageComponent: React.ComponentType<MessageComponentProps>
}

const Chat = ({ data, isGenerating, MessageComponent, onHeightChange }: ChatProps) => {
    const { id: chatID, intro, messages } = data

    const contentRef = React.useRef<HTMLDivElement>(null)

    const introMessage = React.useMemo<MessageData>(
        () => ({
            id: makeMessageID(),
            role: "assistant",
            content: intro,
            updatedAt: Date.now(),
        }),
        [intro],
    )

    useResizeObserver(
        contentRef,
        (entry) => {
            onHeightChange?.(entry.contentRect.height)
        },
        isGenerating,
    )

    return (
        <div className={css.root}>
            <div className={css.content} ref={contentRef}>
                <Animation>
                    <m.div key={chatID} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Message className={css.intro} data={introMessage} showMenu={false} />
                    </m.div>
                    <AnimatePresence>
                        {messages.map((id) => (
                            <m.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <MessageComponent chatID={chatID} id={id} />
                            </m.div>
                        ))}
                    </AnimatePresence>
                </Animation>
            </div>
        </div>
    )
}

export default Chat
