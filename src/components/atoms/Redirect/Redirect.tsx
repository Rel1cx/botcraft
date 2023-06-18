import { replaceUnsafe } from "@swan-io/chicane"
import * as React from "react"

type RedirectProps = {
    to: string
}

class Redirect extends React.Component<RedirectProps> {
    override componentDidMount() {
        const { to } = this.props
        replaceUnsafe(to)
    }

    override render() {
        return null
    }
}

export default Redirect
