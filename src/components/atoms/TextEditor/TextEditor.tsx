// import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
// import { languages } from "@codemirror/language-data"
import { EditorView, placeholder } from "@codemirror/view"
import clsx from "clsx"
import { basicLight } from "cm6-theme-basic-light"
import { minimalSetup } from "codemirror"
import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"
import CodeMirror from "rodemirror"

import { noop } from "@/lib/utils"

import * as css from "./styles.css"

type TextEditorProps = {
    className?: string
    defaultValue?: string
    placeholder?: string
    onChange?: (value: string) => void
}

const defaultPlaceholder = "Ctrl+Enter to send, Enter to add new line"

// const extensions = [markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]

const TextEditor = React.memo(
    ({
        className,
        onChange = noop,
        placeholder: placeholderText = defaultPlaceholder,
        defaultValue = "",
    }: TextEditorProps) => {
        const ref = React.useRef(null)
        const editorViewRef = React.useRef<EditorView>()
        const value = React.useRef(defaultValue).current

        const extensions = React.useMemo(
            () => [minimalSetup, basicLight, placeholder(placeholderText), EditorView.lineWrapping],
            [placeholderText],
        )

        return (
            <div className={clsx(css.root, className)}>
                <div className={css.content}>
                    <ErrorBoundary fallback={<div>Something went wrong</div>}>
                        <CodeMirror
                            ref={ref}
                            aria-label="text-editor"
                            extensions={extensions}
                            value={value}
                            onEditorViewChange={(view) => {
                                editorViewRef.current = view
                            }}
                            onUpdate={(view) => {
                                if (!view.docChanged) {
                                    return
                                }

                                const value = view.state.doc.toString()

                                onChange(value)
                            }}
                        />
                    </ErrorBoundary>
                </div>
            </div>
        )
    },
)

export default TextEditor
