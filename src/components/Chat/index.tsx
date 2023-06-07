import { useResizeObserver } from "@react-hookz/web"
import { useRef } from "react"

import type { StampID } from "@/lib/uuid"
import type { ChatItem } from "@/stores"

import * as css from "./styles.css"

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
    MessageRenderer: ({ id }: { id: StampID; className?: string }) => React.ReactNode
}

const Chat = ({ data, isGenerating, MessageRenderer, onHeightChange }: ChatProps) => {
    const { id, intro, messages } = data

    const contentRef = useRef<HTMLDivElement>(null)

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
                {messages.map((id) => (
                    <MessageRenderer key={id} id={id} />
                ))}
            </div>
        </div>
    )
}

export default Chat
