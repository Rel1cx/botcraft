import { useResizeObserver } from "@react-hookz/web"
import { AnimatePresence, m } from "framer-motion"
import * as React from "react"

import type { ChatItem } from "@/atoms"
import type { MessageData } from "@/bots/builtins/types"
import { makeMessageID, type MessageID } from "@/zod/id"

import * as css from "./styles.css"

const Message = React.lazy(() => import("@/components/atoms/Message/Message"))

const Animation = React.lazy(() => import("@/components/atoms/Animation/Animation"))

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
    MessageRenderer: ({ id }: { id: MessageID; className?: string }) => React.ReactNode
}

const Chat = ({ data, isGenerating, MessageRenderer, onHeightChange }: ChatProps) => {
    const { id, intro, messages } = data

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
        <div className={css.container}>
            <div className={css.content} ref={contentRef}>
                <Animation>
                    <m.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Message className={css.intro} data={introMessage} />
                    </m.div>
                    <AnimatePresence>
                        {messages.map((id) => (
                            <m.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <MessageRenderer id={id} />
                            </m.div>
                        ))}
                    </AnimatePresence>
                </Animation>
            </div>
        </div>
    )
}

export default Chat
