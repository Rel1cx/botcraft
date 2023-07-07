import { replaceUnsafe, useLocation } from "@swan-io/chicane"
import * as React from "react"

import { useConst } from "@/lib/hooks/use-const"

type RedirectProps = {
    to: string
}

// Modified version of https://github.com/swan-io/chicane/blob/main/example/src/Redirect.tsx
const Redirect = React.memo<RedirectProps>(
    ({ to }) => {
        const location = useConst(useLocation().toString())
        const dist = useConst(to)

        React.useLayoutEffect(() => {
            if (location === dist) {
                return
            }

            replaceUnsafe(to)
        }, [dist, location, to])

        return null
    },
    () => false,
)

export default Redirect
