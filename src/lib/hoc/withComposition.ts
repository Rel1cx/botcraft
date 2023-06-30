import type { InputHTMLAttributes } from "react"
import React, { useState } from "react"

export type Props = InputHTMLAttributes<HTMLInputElement>

type InputType = "input" | "textarea"

export const withComposition = <T extends Props>(WrappedComponent: React.ComponentType<T> | InputType) => {
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
