import { useDebouncedState } from "@react-hookz/web"
import * as React from "react"

import { noop } from "@/lib/helper"
import type { ChatID } from "@/zod/id"

import TextEditor from "../atoms/TextEditor/TextEditor"
import * as css from "./styles.css"

type ChatMessageEditorProps = {
    id: ChatID
    defaultContent?: string
    shouldSend?: boolean
    onComplete?: (content: string) => void
}

const ChatMessageEditor = React.memo(
    ({ defaultContent = "", id, onComplete = noop, shouldSend = false }: ChatMessageEditorProps) => {
        const [focused, setFocused] = React.useState(false)
        const [content, setContent] = React.useState(defaultContent)

        const [debouncedContent, setDebouncedContent] = useDebouncedState(content, 500)

        const onContentChange = React.useCallback(
            (value: string) => {
                React.startTransition(() => {
                    setContent(value)
                    setDebouncedContent(value)
                })
            },
            [setDebouncedContent],
        )

        // const tokens = React.useMemo(() => {
        //     if (debouncedContent === "") {
        //         return 0
        //     }
        //     const message: Pick<MessageData, "content" | "role"> = { content: debouncedContent, role: "user" }
        //     return estimateTokenCount([message])(bot)
        // }, [bot, debouncedContent])

        return (
            <div className={css.container}>
                <div
                    className={css.toolbar}
                    style={{
                        opacity: focused ? 1 : 0,
                    }}
                >
                    <span className={css.info}>Words: {content.length}</span>
                    {/* <span className={css.info}>Tokens: {tokens}</span>
                    <span className={css.info}>Total Tokens: {totalTokens + tokens}</span> */}
                </div>

                {React.useMemo(
                    () => (
                        <TextEditor
                            className={css.content}
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
    },
)

export default ChatMessageEditor
