import { useDebouncedState } from "@react-hookz/web"
import { startTransition, useCallback, useMemo, useState } from "react"

import { defaultBot } from "@/bots"
import type { MessageData } from "@/bots/builtins/types"
import { noop } from "@/lib/helper"
import type { StampID } from "@/lib/uuid"
import { useChatTokens } from "@/stores"

import MarkdownEditor from "../atoms/MarkdownEditor"
import * as css from "./styles.css"

type ChatMessageEditorProps = {
    id: StampID
    defaultContent?: string
    shouldSend?: boolean
    onComplete?: (content: string) => void
}

export const ChatMessageEditor = ({
    defaultContent = "",
    id,
    onComplete = noop,
    shouldSend = false,
}: ChatMessageEditorProps) => {
    const totalTokens = useChatTokens(id)
    const [focused, setFocused] = useState(false)
    const [content, setContent] = useState(defaultContent)

    const [debouncedContent, setDebouncedContent] = useDebouncedState(content, 500)

    const onContentChange = useCallback(
        (value: string) => {
            startTransition(() => {
                setContent(value)
                setDebouncedContent(value)
            })
        },
        [setDebouncedContent],
    )

    const tokens = useMemo(() => {
        if (debouncedContent === "") {
            return 0
        }
        const message: MessageData = { id, content: debouncedContent, role: "user", updatedAt: Date.now() }
        return defaultBot.estimateTokenCount([message])
    }, [debouncedContent, id])

    return (
        <div className={css.container}>
            <div
                className={css.toolbar}
                style={{
                    opacity: focused ? 1 : 0,
                }}
            >
                <span className={css.info}>Words: {content.length}</span>
                <span className={css.info}>Tokens: {tokens}</span>
                <span className={css.info}>Total Tokens: {totalTokens + tokens}</span>
            </div>

            {useMemo(
                () => (
                    <MarkdownEditor
                        defaultValue={defaultContent}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={onContentChange}
                        onComplete={onComplete}
                        shouldComplete={(value) => value.trim() !== "" && shouldSend}
                    />
                ),
                [defaultContent, onComplete, onContentChange, shouldSend],
            )}
        </div>
    )
}
