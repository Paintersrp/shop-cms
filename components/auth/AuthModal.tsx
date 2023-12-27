"use client"

import { FC } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Text } from "@/components/ui/Text"
import { Icons } from "@/components/Iconss"
import { AuthModalForm } from "@/components/auth/AuthModalForm"
import { useAuthModal } from "@/components/auth/useAuthModal"

interface AuthModalProps {
  open?: boolean
}

const AuthModal: FC<AuthModalProps> = ({ open = false }) => {
  const { open: modalOpen, onOpen, onClose, view } = useAuthModal()

  if (open) {
    onOpen()
  }

  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Icons.Logo className="mx-auto h-8 w-8 mb-3" />
            <Text type="h3" className="text-center">
              {view === "sign-in" && "Sign In"}
              {view === "sign-up" && "Sign Up"}
              {view === "forgot" && "Reset Password"}
            </Text>
          </DialogTitle>
        </DialogHeader>

        <AuthModalForm />
      </DialogContent>
    </Dialog>
  )
}

export { AuthModal }
