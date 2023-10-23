import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import React from "react"


export type MyDialogProps = {
    onClose: (value: string) => void
    title?: string
    message?: string
}

export function CouponUseDialog(props: MyDialogProps) {
    const { onClose, title, message } = props

    return (
        <Dialog open onClose={() => onClose('close')}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose('cancel')} autoFocus>Cancel</Button>
                <Button onClick={() => onClose('ok')}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}