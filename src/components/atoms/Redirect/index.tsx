import { replaceUnsafe, useLocation } from "@swan-io/chicane"
import * as React from "react"

// https://github.com/swan-io/chicane/blob/main/example/src/Redirect.tsx
const Redirect = ({ to }: { to: string }) => {
    const location = useLocation().toString()

    React.useLayoutEffect(() => {
        if (to !== location) {
            replaceUnsafe(to)
        }
    }, [location, to])

    return null
}

export default Redirect
