import { useDebouncedState } from "@react-hookz/web"
import { useAtomValue, useStore } from "jotai"
import * as React from "react"

import { botAtom, useChatTokens } from "@/atoms"
import { estimateTokenCount } from "@/bots/builtins/ChatGPT"
import type { MessageData } from "@/bots/builtins/types"
import { noop } from "@/lib/helper"
import type { StampID } from "@/lib/uuid"

import MarkdownEditor from "../atoms/MarkdownEditor/MarkdownEditor"
import * as css from "./styles.css"

type ChatMessageEditorProps = {
    id: StampID
    defaultContent?: string
    shouldSend?: boolean
    onComplete?: (content: string) => void
}

const ChatMessageEditor = React.memo(
    ({ defaultContent = "", id, onComplete = noop, shouldSend = false }: ChatMessageEditorProps) => {
        const botStore = useStore()
        const bot = useAtomValue(botAtom, {
            store: botStore,
        })
        const totalTokens = useChatTokens(id)
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

        const tokens = React.useMemo(() => {
            if (debouncedContent === "") {
                return 0
            }
            const message: MessageData = { id, content: debouncedContent, role: "user", updatedAt: Date.now() }
            return estimateTokenCount([message])(bot)
        }, [bot, debouncedContent, id])

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

                {React.useMemo(
                    () => (
                        <MarkdownEditor
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
