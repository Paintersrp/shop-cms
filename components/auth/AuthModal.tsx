"use client"

import { useAuthModal } from "@/hooks/useAuthModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Text } from "@/components/ui/Text"
import { Icons } from "@/components/Icons"
import { AuthModalForm } from "@/components/auth/AuthModalForm"

const AuthModal = () => {
  const { open, onClose, view } = useAuthModal()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Icons.logo className="mx-auto h-8 w-8 mb-3" />
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
