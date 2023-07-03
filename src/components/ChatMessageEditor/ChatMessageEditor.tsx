import * as React from "react"

import { noop } from "@/lib/utils"

import TextEditor from "../atoms/TextEditor/TextEditor"
import * as css from "./styles.css"

type ChatMessageEditorProps = {
    content?: string
    onChange?: (content: string) => void
}

const ChatMessageEditor = React.memo(
    React.forwardRef<HTMLInputElement, ChatMessageEditorProps>(({ content = "", onChange = noop }, ref) => {
        return (
            <div ref={ref} className={css.root}>
                {/* <div
                    className={css.toolbar}
                    style={{
                        opacity: focused ? 1 : 0,
                    }}
                /> */}
                <TextEditor className={css.content} defaultValue={content} onChange={onChange} />
            </div>
        )
    }),
)

export default ChatMessageEditor
