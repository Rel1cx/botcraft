import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { EditorView } from "@codemirror/view"
import { Option as O } from "@swan-io/boxed"
import type { BasicSetupOptions } from "@uiw/react-codemirror"
import CodeMirror from "@uiw/react-codemirror"
import { basicLight } from "cm6-theme-basic-light"
import { memo, useRef } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useHotkeys } from "react-hotkeys-hook"

import * as css from "./styles.css"

type MarkdownEditorProps = {
    defaultValue?: string
    placeholder?: string
    onChange?: (value: string) => void
    onComplete?: (value: string) => void
    shouldComplete?: (value: string) => boolean
    shouldResetEditor?: (value: string) => boolean
}

const defaultShouldComplete = (value: string) => value.trim() !== ""

const defaultShouldResetEditor = (value: string) => value.trim() !== ""

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

const defaultPlaceholder = "Shift+Enter to send, Enter to add new line"

const extensions = [markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]

const resetEditor = (editor: EditorView) => {
    editor.dispatch({
        changes: {
            from: 0,
            to: editor.state.doc.length,
            insert: "",
        },
    })
}

const MarkdownEditor = memo(
    ({
        defaultValue = "",
        onChange,
        onComplete,
        placeholder = defaultPlaceholder,
        shouldComplete = defaultShouldComplete,
        shouldResetEditor = defaultShouldResetEditor,
    }: MarkdownEditorProps) => {
        const contentRef = useRef(defaultValue)
        const editorRef = useRef<O<EditorView>>(O.None())

        useHotkeys(
            "shift+enter",
            (evt) => {
                const content = contentRef.current.trim()
                if (!shouldComplete(content)) {
                    return
                }
                evt.preventDefault()
                onComplete?.(content)
                if (shouldResetEditor(content)) {
                    editorRef.current.map(resetEditor)
                }
            },
            {
                enableOnContentEditable: true,
            },
        )

        return (
            <div className={css.container}>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <CodeMirror
                        id="markdown-editor"
                        className={css.content}
                        width="100%"
                        maxHeight="320px"
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onCreateEditor={(editor) => {
                            editorRef.current = O.Some(editor)
                        }}
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

export default MarkdownEditor
