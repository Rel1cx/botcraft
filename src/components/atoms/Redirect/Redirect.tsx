import { replaceUnsafe } from "@swan-io/chicane"
import { Component } from "react"

type RedirectProps = {
    to: string
}

class Redirect extends Component<RedirectProps> {
    override componentDidMount() {
        const { to } = this.props
        replaceUnsafe(to)
    }

    override render() {
        return null
    }
}

export default Redirect
