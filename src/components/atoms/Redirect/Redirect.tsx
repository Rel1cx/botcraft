import { replaceUnsafe, useLocation } from "@swan-io/chicane"
import * as React from "react"

type RedirectProps = {
    to: string
}

// Modified version of https://github.com/swan-io/chicane/blob/main/example/src/Redirect.tsx
const Redirect = React.memo<RedirectProps>(
    ({ to }) => {
        const location = useLocation().toString()

        React.useInsertionEffect(() => {
            if (location === to) {
                return
            }
            replaceUnsafe(to)
        }, [location, to])

        return null
    },
    () => false,
)

export default Redirect
