/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions */
import * as React from "react"

export const useConst = <T>(initialValue: T | (() => T)): T => {
    const ref = React.useRef<{ value: T }>()
    // eslint-disable-next-line functional/no-conditional-statements
    if (ref.current === undefined) {
        ref.current = {
            value: typeof initialValue === "function" ? (initialValue as Function)() : initialValue,
        }
    }
    return ref.current.value
}
