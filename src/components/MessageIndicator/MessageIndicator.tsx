import * as React from "react"

import * as css from "./styles.css"

type MessageIndicatorProps = {
    status: "sending" | "sent" | "failed"
    onClick?: () => void
}

const MessageIndicator = React.memo(({ status, onClick }: MessageIndicatorProps) => {
    return (
        <div className={css.root} onClick={onClick}>
            <div className={css.sending}>
                <div className={css.dot} />
                <div className={css.dot} />
                <div className={css.dot} />
            </div>
        </div>
    )
})

export default MessageIndicator
