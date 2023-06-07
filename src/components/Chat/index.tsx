import { useResizeObserver } from "@react-hookz/web"
import { useRef } from "react"

import type { ChatItem } from "@/stores"

import * as css from "./styles.css"

export type ChatProps = {
    data: ChatItem
    isGenerating?: boolean
    onHeightChange?: (height: number) => void
    renderMessage?: (id: string) => React.ReactNode
}

const Chat = ({ data, isGenerating, onHeightChange, renderMessage }: ChatProps) => {
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
                    <div key={id} className={css.message}>
                        {renderMessage?.(id) ?? null}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chat
