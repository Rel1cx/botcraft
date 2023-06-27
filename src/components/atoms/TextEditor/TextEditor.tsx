// import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
// import { languages } from "@codemirror/language-data"
import { EditorView } from "@codemirror/view"
import { Option as O } from "@swan-io/boxed"
import type { BasicSetupOptions } from "@uiw/react-codemirror"
import CodeMirror from "@uiw/react-codemirror"
import clsx from "clsx"
import { basicLight } from "cm6-theme-basic-light"
import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"

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
        onChange,
        onFocus,
        placeholder = defaultPlaceholder,
        value = "",
    }: TextEditorProps) => {
        const contentRef = React.useRef(defaultValue)
        const editorRef = React.useRef<O<EditorView>>(O.None())

        return (
            <div className={clsx(css.root, className)}>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <CodeMirror
                        id="markdown-editor"
                        className={css.content}
                        aria-label="markdown-editor"
                        width="100%"
                        maxHeight="320px"
                        value={value}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onCreateEditor={(editor) => {
                            editorRef.current = O.Some(editor)
                        }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={(value) => {
                            contentRef.current = value
                            onChange?.(value)
                        }}
                        theme={basicLight}
                        basicSetup={setupOptions}
                        extensions={extensions}
                    />
                </ErrorBoundary>
            </div>
        )
    },
)

export default TextEditor
