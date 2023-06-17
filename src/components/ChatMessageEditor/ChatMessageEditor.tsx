import { useDebouncedState } from "@react-hookz/web"
import { useAtomValue, useStore } from "jotai"
import { memo, startTransition, useCallback, useMemo, useState } from "react"

import { botAtom, useChatTokens } from "@/atoms"
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

const ChatMessageEditor = memo(
    ({ defaultContent = "", id, onComplete = noop, shouldSend = false }: ChatMessageEditorProps) => {
        const botStore = useStore()
        const bot = useAtomValue(botAtom, {
            store: botStore,
        })
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
            return bot.estimateTokenCount([message])
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
    },
)

export default ChatMessageEditor
