"use client"

import type { FC, ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"

interface ModalProps {
  title: string
  description: string
  open: boolean
  onClose: () => void
  children?: ReactNode
}

const Modal: FC<ModalProps> = ({ title, description, open, onClose, children }) => {
  const onChange = (open: boolean) => {
    if (open) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export { Modal }
