/* eslint-disable functional/no-this-expressions */
import { replaceUnsafe } from "@swan-io/chicane"
import * as React from "react"

type RedirectProps = {
    to: string
}

class Redirect extends React.Component<RedirectProps> {
    public override componentDidMount() {
        const { to } = this.props
        replaceUnsafe(to)
    }

    public override render() {
        return null
    }
}

export default Redirect
