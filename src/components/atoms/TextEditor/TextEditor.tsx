// import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
// import { languages } from "@codemirror/language-data"
import { Annotation } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { githubLight } from "@ddietr/codemirror-themes/github-light";
import type { BasicSetupOptions, ReactCodeMirrorProps, ReactCodeMirrorRef } from "@uiw/react-codemirror";
import clsx from "clsx";
import * as React from "react";
import invariant from "tiny-invariant";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { noop } from "@/lib/utils";

import MemoizedCodeMirror from "./MemoizedCodeMirror";
import * as css from "./styles.css";

type TextEditorProps = {
    className?: string;
    value?: string;
    placeholder?: string;
    autoFocus?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: string) => void;
};

const setupOptions: BasicSetupOptions = {
    lineNumbers: false,
    highlightActiveLineGutter: false,
    foldGutter: false,
    dropCursor: false,
    allowMultipleSelections: true,
    // indentOnInput?: boolean;
    bracketMatching: true,
    closeBrackets: false,
    autocompletion: false,
    rectangularSelection: true,
    crosshairCursor: true,
    highlightActiveLine: false,
    highlightSelectionMatches: false,
    closeBracketsKeymap: false,
    searchKeymap: false,
    foldKeymap: false,
    completionKeymap: false,
    lintKeymap: false,
    tabSize: 4,
};

const SkipUpdate = Annotation.define<boolean>();

const defaultPlaceholder = "Ctrl+Enter to send, Enter to add new line";

// const extensions = [markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]
const extensions = [EditorView.lineWrapping];

const TextEditor = React.memo(
    ({
        className,
        onBlur,
        onChange = noop,
        onFocus,
        autoFocus = false,
        placeholder = defaultPlaceholder,
        value = "",
    }: TextEditorProps) => {
        const ref = React.useRef<ReactCodeMirrorRef>(null);
        const defaultValue = React.useRef(value).current;

        const handleChange = React.useCallback<NonNullable<ReactCodeMirrorProps["onChange"]>>(
            (value, viewUpdate) => {
                if (!viewUpdate.docChanged) {
                    return;
                }

                if (viewUpdate.transactions.some((tr) => tr.annotation(SkipUpdate))) {
                    return;
                }

                if (viewUpdate.view.composing) {
                    return;
                }

                onChange(value);
            },
            [onChange],
        );

        const handleCompositionEnd = React.useCallback(() => {
            const view = ref.current?.view;
            invariant(view, "view is not defined");
            onChange(view.state.doc.toString());
        }, [onChange]);

        React.useInsertionEffect(() => {
            const view = ref.current?.view;

            if (!view || view.hasFocus) {
                return;
            }

            const valueOfView = view.state.doc.toString();

            if (valueOfView === value) {
                return;
            }

            view.dispatch({
                changes: {
                    from: 0,
                    to: view.state.doc.length,
                    insert: value,
                },
                annotations: SkipUpdate.of(true),
            });
        }, [value]);

        return (
            <div className={clsx(css.root, className)}>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <MemoizedCodeMirror
                        id="markdown-editor"
                        ref={ref}
                        className={css.content}
                        aria-label="markdown-editor"
                        width="100%"
                        maxHeight="320px"
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                        theme={githubLight}
                        basicSetup={setupOptions}
                        extensions={extensions}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onCompositionEnd={handleCompositionEnd}
                        value={defaultValue}
                        onChange={handleChange}
                    />
                </ErrorBoundary>
            </div>
        );
    },
);

export default TextEditor;
