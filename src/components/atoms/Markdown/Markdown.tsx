import "highlight.js/styles/nord.css";
import "katex/dist/katex.min.css";

import { clsx } from "clsx";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { PluggableList } from "react-markdown/lib/react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import MemoizedReactMarkdown from "./MemoizedReactMarkdown";
import * as css from "./styles.css";

export type MarkdownProps = {
    className?: string;
    content?: string;
};

const remarkExtensions = [remarkGfm, remarkBreaks, remarkMath];

const rehypeExtensions: PluggableList = [[rehypeHighlight, { ignoreMissing: true }], rehypeKatex];

const Markdown = React.memo(({ className, content = "" }: MarkdownProps) => {
    return (
        <ErrorBoundary fallback={<p>Failed to render markdown.</p>}>
            <MemoizedReactMarkdown
                className={clsx(["prose", "dark:prose-invert", css.root, className])}
                remarkPlugins={remarkExtensions}
                rehypePlugins={rehypeExtensions}
            >
                {content}
            </MemoizedReactMarkdown>
        </ErrorBoundary>
    );
});

export default Markdown;
