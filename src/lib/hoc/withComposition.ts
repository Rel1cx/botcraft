import type { InputHTMLAttributes } from "react"
import React, { useState } from "react"

export type Props = InputHTMLAttributes<HTMLInputElement>

type InputType = "input" | "textarea"

/**
 * HOC that enhances an input component with composition event handling.
 * @template T - Props type of the wrapped component
 * @param {React.ComponentType<T> | InputType} WrappedComponent - The input component to be enhanced
 * @returns {React.FC<T & Props>} - The enhanced input component
 */
export const withComposition = <T extends Props>(WrappedComponent: React.ComponentType<T> | InputType) => {
    /**
     * Inner component that handles composition event and passes down the enhanced props to the wrapped component.
     * @param {T & Props} props - Props passed to the inner component
     * @returns {React.ReactElement} - The wrapped component with enhanced props
     */
    const Inner: React.FC<T & Props> = (props) => {
        const composing = React.useRef(false)
        const [text, setText] = useState(props.value)

        const onComposition = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { currentTarget, type } = e
            const { value } = currentTarget

            if (type === "compositionstart") {
                composing.current = true
                return
            }
            if (type === "compositionend") {
                composing.current = false
                setText(value)
                props.onChange?.(e)
            }
        }

        const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
            setText(e.currentTarget.value)

            if (!composing.current) {
                props.onChange?.(e)
            }
        }

        const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
            if (composing.current) {
                return
            }
            props.onKeyDown?.(e)
        }

        return React.createElement(WrappedComponent, {
            ...props,
            value: text,
            onChange,
            onCompositionStart: onComposition,
            onCompositionEnd: onComposition,
            onKeyDown,
        })
    }

    return Inner
}
