import * as React from "react";

import { noop } from "@/lib/utils";

import TextEditor from "../atoms/TextEditor/TextEditor";
import * as css from "./styles.css";

type MessageEditorProps = {
    content?: string;
    onChange?: (content: string) => void;
};

const MessageEditor = React.memo(
    React.forwardRef<HTMLInputElement, MessageEditorProps>(({ content = "", onChange = noop }, ref) => {
        return (
            <div ref={ref} className={css.root}>
                {/* <div
                    className={css.toolbar}
                    style={{
                        opacity: focused ? 1 : 0,
                    }}
                /> */}
                <TextEditor className={css.content} value={content} onChange={onChange} />
            </div>
        );
    }),
);

export default MessageEditor;
