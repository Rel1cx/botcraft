import "highlight.js/styles/nord.css"
import "katex/dist/katex.min.css"

import { clsx } from "clsx"
import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"
import type { PluggableList } from "react-markdown/lib/react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import type { MessageData } from "@/bots/builtins/types"

import MemoizedReactMarkdown from "../Markdown/MemoizedReactMarkdown"
import * as css from "./styles.css"

export type MessageProps = {
    className?: string
    data: MessageData
}

const remarkExtensions = [remarkGfm, remarkBreaks, remarkMath]

const rehypeExtensions: PluggableList = [[rehypeHighlight, { ignoreMissing: true }], rehypeKatex]

const Message = React.memo(
    React.forwardRef<HTMLDivElement, MessageProps>(({ className, data, ...rest }, ref) => {
        const { content, role } = data

        // Significantly reduce rendering blocking time.
        const deferredContent = React.useDeferredValue(content)

        return (
            <div className={clsx(css.container[role], className)} ref={ref} {...rest}>
                <ErrorBoundary fallback={<div>{content}</div>}>
                    <MemoizedReactMarkdown
                        className={`${css.content[role]} prose dark:prose-invert`}
                        remarkPlugins={remarkExtensions}
                        rehypePlugins={rehypeExtensions}
                    >
                        {deferredContent}
                    </MemoizedReactMarkdown>
                </ErrorBoundary>
            </div>
        )
    }),
)

export default Message
