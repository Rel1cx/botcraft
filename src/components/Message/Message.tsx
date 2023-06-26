import { Button } from "@ariakit/react"
import { DotsThree } from "@phosphor-icons/react"
import { clsx } from "clsx"
import * as React from "react"

import type { MessageData } from "@/bots/builtins/types"
import { noop } from "@/lib/helper"
import { vars } from "@/theme/vars.css"

import Icon from "../atoms/Icon/Icon"
import Markdown from "../atoms/Markdown/Markdown"
import MessageMenu from "../MessageMenu/MessageMenu"
import * as css from "./styles.css"

export type MessageProps = {
    className?: string
    data: MessageData
    showMenu?: boolean
    onRegenerateClick?: () => void
    onRemoveClick?: () => void
}

const Message = React.memo(
    ({ className, data, onRegenerateClick = noop, onRemoveClick = noop, showMenu = true, ...rest }: MessageProps) => {
        const { content, role } = data

        // Significantly reduce rendering blocking time.
        const deferredContent = React.useDeferredValue(content)

        return (
            <div className={clsx(css.root[role], className)} {...rest}>
                <Markdown className={css.content[role]} content={deferredContent} />
                {role !== "system" && showMenu && (
                    <MessageMenu position="bottom-start" onRemoveClick={onRemoveClick}>
                        <Button as="button" className={css.actionButton} clickOnEnter clickOnSpace>
                            <Icon as={DotsThree} size={24} fill={vars.colors.black50} />
                        </Button>
                    </MessageMenu>
                )}
            </div>
        )
    },
)

export default Message
