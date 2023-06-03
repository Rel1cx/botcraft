import { useResizeObserver } from "@react-hookz/web"
import { lazy, Suspense, useRef } from "react"

import type { StampID } from "@/lib/uuid"
import type { ChatItem } from "@/stores"
import { useMessage } from "@/stores"

import * as css from "./styles.css"

const Message = lazy(() => import("@/components/atoms/Message"))

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
}

const ChatMessageRenderer = ({ id }: { id: StampID }) => {
    const [data] = useMessage(id)

    return <Suspense>{data ? <Message data={data} /> : null}</Suspense>
}

const Chat = ({ data, isGenerating, onHeightChange }: ChatProps) => {
    const { id, messages } = data

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
                    <ChatMessageRenderer key={id} id={id} />
                ))}
            </div>
        </div>
    )
}

export default Chat
