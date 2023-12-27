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
  className?: string
  children?: ReactNode
}

const Modal: FC<ModalProps> = ({ title, description, open, onClose, className, children }) => {
  const onChange = (open: boolean) => {
    console.log("Here")
    console.log(open)
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

        <div className={className}>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export { Modal }
