import * as React from "react";

import { noop } from "@/lib/utils";

import * as css from "./styles.css";

const TextEditor = React.lazy(() => import("../atoms/TextEditor/TextEditor"));

type MessageEditorProps = {
    autoFocus?: boolean;
    content?: string;
    onChange?: (content: string) => void;
};

const MessageEditor = React.memo(
    React.forwardRef<HTMLInputElement, MessageEditorProps>(
        ({ autoFocus = false, content = "", onChange = noop }, ref) => {
            return (
                <div ref={ref} className={css.root}>
                    {/* <div
                    className={css.toolbar}
                    style={{
                        opacity: focused ? 1 : 0,
                    }}
                /> */}
                    <TextEditor className={css.content} autoFocus={autoFocus} value={content} onChange={onChange} />
                </div>
            );
        },
    ),
);

export default MessageEditor;
