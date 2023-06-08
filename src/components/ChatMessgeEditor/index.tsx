import { useDebouncedState } from "@react-hookz/web"
import { startTransition, useMemo, useState } from "react"
import useEvent from "react-use-event-hook"

import { defaultBot } from "@/bots"
import type { MessageData } from "@/bots/builtins/types"
import { noop } from "@/lib/helper"
import type { StampID } from "@/lib/uuid"

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
    const [content, setContent] = useState(defaultContent)

    const [debouncedContent, setDebouncedContent] = useDebouncedState(content, 500)

    const onContentChange = useEvent((value: string) => {
        startTransition(() => {
            setContent(value)
            setDebouncedContent(value)
        })
    })

    const tokens = useMemo(() => {
        if (debouncedContent === "") {
            return 0
        }
        const message: MessageData = { id, content: debouncedContent, role: "user", updatedAt: Date.now() }
        return defaultBot.estimateTokenCount([message])
    }, [debouncedContent, id])

    return (
        <div>
            {useMemo(
                () => (
                    <MarkdownEditor
                        defaultValue={defaultContent}
                        onComplete={onComplete}
                        onChange={onContentChange}
                        shouldComplete={(value) => value.trim() !== "" && shouldSend}
                    />
                ),
                [defaultContent, onComplete, onContentChange, shouldSend],
            )}
            <div className={css.footer}>
                <span>
                    Words: <span className={css.number}>{content.length}</span>
                </span>
                <span>
                    Tokens: <span className={css.number}>{tokens}</span>
                </span>
            </div>
        </div>
    )
}
