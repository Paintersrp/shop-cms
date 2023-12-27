"use client"

import { type FC, type ReactNode } from "react"

import { useMounted } from "@/hooks/useMounted"
import { Button } from "@/components/ui/Buttonn"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"

interface ControlledConfirmationModalProps {
  onConfirm: () => void
  isLoading: boolean
  open: boolean
  onClose: () => void
}

const ControlledConfirmationModal: FC<ControlledConfirmationModalProps> = ({
  onConfirm,
  isLoading,
  open,
  onClose,
}) => {
  const mounted = useMounted()

  if (!mounted) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this shop?</DialogTitle>
          <DialogDescription className="">This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 justify-end md:justify-end">
          <DialogClose asChild>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation()
                onConfirm()
              }}
              type="button"
              autoFocus
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ControlledConfirmationModal }
