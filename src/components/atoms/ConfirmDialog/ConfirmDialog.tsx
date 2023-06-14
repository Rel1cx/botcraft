import { Dialog, DialogDescription, DialogDismiss, DialogHeading, useDialogStore } from "@ariakit/react"
import clsx from "clsx"
import { memo, type ReactNode } from "react"

import * as css from "./styles.css"

type ConfirmDialogProps = {
    title?: ReactNode
    description?: ReactNode
    cancelLabel?: ReactNode
    confirmLabel?: ReactNode
    danger?: boolean
    open?: boolean
    onClose?: () => void
    onConfirm?: () => void
    onCancel?: () => void
}

const ConfirmDialog = memo(
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
            <Dialog store={dialog} backdrop={<div className={css.backdrop} />} className={css.dialog}>
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
