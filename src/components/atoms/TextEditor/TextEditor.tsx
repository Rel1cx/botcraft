// import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
// import { languages } from "@codemirror/language-data"
import { EditorView } from "@codemirror/view"
import type { BasicSetupOptions, ReactCodeMirrorRef } from "@uiw/react-codemirror"
import CodeMirror from "@uiw/react-codemirror"
import clsx from "clsx"
import { basicLight } from "cm6-theme-basic-light"
import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"
import invariant from "tiny-invariant"

import { noop } from "@/lib/utils"

import * as css from "./styles.css"

type TextEditorProps = {
    className?: string
    value?: string
    defaultValue?: string
    placeholder?: string
    onFocus?: () => void
    onBlur?: () => void
    onChange?: (value: string) => void
}

const setupOptions: BasicSetupOptions = {
    lineNumbers: false,
    highlightActiveLineGutter: false,
    foldGutter: false,
    // dropCursor?: boolean;
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
    tabSize: 2,
}

const defaultPlaceholder = "Ctrl+Enter to send, Enter to add new line"

// const extensions = [markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]
const extensions = [EditorView.lineWrapping]

const TextEditor = React.memo(
    ({
        className,
        defaultValue = "",
        onBlur,
        onChange = noop,
        onFocus,
        placeholder = defaultPlaceholder,
        value = "",
    }: TextEditorProps) => {
        const ref = React.useRef<ReactCodeMirrorRef>(null)

        return (
            <div className={clsx(css.root, className)}>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <CodeMirror
                        id="markdown-editor"
                        ref={ref}
                        className={css.content}
                        aria-label="markdown-editor"
                        width="100%"
                        maxHeight="320px"
                        placeholder={placeholder}
                        theme={basicLight}
                        basicSetup={setupOptions}
                        extensions={extensions}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        value={value}
                        defaultValue={defaultValue}
                        onCompositionEnd={() => {
                            const view = ref.current?.view
                            invariant(view, "view is not defined")
                            onChange(view.state.doc.toString())
                        }}
                        onChange={(value, viewUpdate) => {
                            if (!viewUpdate.docChanged) {
                                return
                            }

                            if (viewUpdate.view.composing) {
                                return
                            }

                            onChange(value)
                        }}
                    />
                </ErrorBoundary>
            </div>
        )
    },
)

export default TextEditor
