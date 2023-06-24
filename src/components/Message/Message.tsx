import { clsx } from "clsx"
import * as React from "react"

import type { MessageData } from "@/bots/builtins/types"

import Markdown from "../atoms/Markdown/Markdown"
import * as css from "./styles.css"

export type MessageProps = {
    className?: string
    data: MessageData
}

const Message = React.memo(
    React.forwardRef<HTMLDivElement, MessageProps>(({ className, data, ...rest }, ref) => {
        const { content, role } = data

        // Significantly reduce rendering blocking time.
        const deferredContent = React.useDeferredValue(content)

        return (
            <div className={clsx(css.root[role], className)} ref={ref} {...rest}>
                <Markdown className={css.content[role]} content={deferredContent} />
            </div>
        )
    }),
)

export default Message
