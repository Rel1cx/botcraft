import * as React from "react"

import { noop } from "@/lib/utils"

import TextEditor from "../atoms/TextEditor/TextEditor"
import * as css from "./styles.css"

type ChatMessageEditorProps = {
    content?: string
    defaultContent?: string
    shouldSend?: boolean
    onChange?: (content: string) => void
    onComplete?: (content: string) => void
}

const ChatMessageEditor = React.memo(
    ({
        content = "",
        defaultContent = "",
        onChange = noop,
        onComplete = noop,
        shouldSend = false,
    }: ChatMessageEditorProps) => {
        const [focused, setFocused] = React.useState(false)

        return (
            <div className={css.root}>
                {/* <div
                    className={css.toolbar}
                    style={{
                        opacity: focused ? 1 : 0,
                    }}
                /> */}
                {React.useMemo(
                    () => (
                        <TextEditor
                            className={css.content}
                            value={content}
                            defaultValue={defaultContent}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            onChange={onChange}
                            onComplete={onComplete}
                            shouldComplete={(value) => value.trim() !== "" && shouldSend}
                        />
                    ),
                    [content, defaultContent, onChange, onComplete, shouldSend],
                )}
            </div>
        )
    },
)

export default ChatMessageEditor
