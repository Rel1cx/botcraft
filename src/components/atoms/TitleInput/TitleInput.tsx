import { memo, useDeferredValue } from "react"
import { Input } from "react-daisyui"

import * as css from "./styles.css"

type TitleInputProps = {
    id?: string
    value?: string
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TitleInput = memo(({ id, onChange, placeholder = "Untitled", value, ...rest }: TitleInputProps) => {
    const deferredValue = useDeferredValue(value)

    return (
        <div id={id} className={css.container}>
            <Input
                className={css.input}
                type="text"
                placeholder={placeholder}
                autoComplete="off"
                value={deferredValue}
                onChange={onChange}
                autoCorrect="off"
                aria-autocomplete="none"
                {...rest}
            />
        </div>
    )
})

export default TitleInput
