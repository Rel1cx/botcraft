import * as React from "react"

import * as css from "./styles.css"

type TitleInputProps = {
    id?: string
    value?: string
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TitleInput = React.memo(({ id, onChange, placeholder = "Untitled", value, ...rest }: TitleInputProps) => {
    const deferredValue = React.useDeferredValue(value)

    return (
        <div id={id} className={css.root}>
            <input
                className={css.input}
                type="text"
                placeholder={placeholder}
                value={deferredValue}
                onChange={onChange}
                translate="no"
                spellCheck="false"
                autoCorrect="off"
                autoComplete="off"
                aria-autocomplete="none"
                {...rest}
            />
        </div>
    )
})

export default TitleInput
