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

interface ConfirmationModalProps {
  onConfirm: () => void
  isLoading: boolean
  children: ReactNode
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ onConfirm, isLoading, children }) => {
  const mounted = useMounted()

  if (!mounted) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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

export { ConfirmationModal }
