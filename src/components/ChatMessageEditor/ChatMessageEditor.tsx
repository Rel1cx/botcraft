import * as React from "react"

import { noop } from "@/lib/utils"

import TextEditor from "../atoms/TextEditor/TextEditor"
import * as css from "./styles.css"

type ChatMessageEditorProps = {
    defaultContent?: string
    shouldSend?: boolean
    onComplete?: (content: string) => void
}

const ChatMessageEditor = React.memo(
    ({ defaultContent = "", onComplete = noop, shouldSend = false }: ChatMessageEditorProps) => {
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
                            defaultValue={defaultContent}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            // onChange={onContentChange}
                            onComplete={onComplete}
                            shouldComplete={(value) => value.trim() !== "" && shouldSend}
                        />
                    ),
                    [defaultContent, onComplete, shouldSend],
                )}
            </div>
        )
    },
)

export default ChatMessageEditor
