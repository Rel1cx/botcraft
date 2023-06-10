import { useResizeObserver } from "@react-hookz/web"
import { AnimatePresence, m } from "framer-motion"
import { lazy, useMemo, useRef } from "react"

import type { MessageData } from "@/bots/builtins/types"
import { makeID, type StampID } from "@/lib/uuid"
import type { ChatItem } from "@/stores"

import * as css from "./styles.css"

const Message = lazy(() => import("@/components/atoms/Message"))

const Animation = lazy(() => import("@/components/atoms/Animation"))

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
    MessageRenderer: ({ id }: { id: StampID; className?: string }) => React.ReactNode
}

const Chat = ({ data, isGenerating, MessageRenderer, onHeightChange }: ChatProps) => {
    const { id, intro, messages } = data

    const contentRef = useRef<HTMLDivElement>(null)

    const introMessage = useMemo<MessageData>(
        () => ({
            id: makeID(),
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
