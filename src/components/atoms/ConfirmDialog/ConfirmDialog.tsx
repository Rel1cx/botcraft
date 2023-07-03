import { Dialog, DialogDescription, DialogDismiss, DialogHeading, useDialogStore } from "@ariakit/react"
import clsx from "clsx"
import * as React from "react"

import * as css from "./styles.css"

type ConfirmDialogProps = {
    title?: React.ReactNode
    description?: React.ReactNode
    cancelLabel?: React.ReactNode
    confirmLabel?: React.ReactNode
    danger?: boolean
    open?: boolean
    onClose?: () => void
    onConfirm?: () => void
    onCancel?: () => void
}

const ConfirmDialog = React.memo(
    ({
        cancelLabel = "Cancel",
        confirmLabel = "OK",
        danger,
        description = "Are you sure?",
        onCancel,
        onClose,
        onConfirm,
        open = false,
        title = "Confirm",
    }: ConfirmDialogProps) => {
        const dialog = useDialogStore({
            open,
            setOpen(open) {
                if (!open) {
                    onClose?.()
                }
            },
        })
        return (
            <Dialog
                className={css.dialog}
                store={dialog}
                backdrop={<div className={clsx(css.backdrop, "duration-120 animate-in fade-in")} />}
            >
                {title && <DialogHeading className={css.heading}>{title}</DialogHeading>}
                {!!description && <DialogDescription>{description}</DialogDescription>}
                <div className={css.buttons}>
                    {!!confirmLabel && (
                        <DialogDismiss className={clsx(css.button, danger && css.danger)} onClick={onConfirm}>
                            {confirmLabel}
                        </DialogDismiss>
                    )}
                    {!!cancelLabel && (
                        <DialogDismiss className={clsx(css.button, css.secondary)} onClick={onCancel}>
                            {cancelLabel}
                        </DialogDismiss>
                    )}
                </div>
            </Dialog>
        )
    },
)

export default ConfirmDialog
