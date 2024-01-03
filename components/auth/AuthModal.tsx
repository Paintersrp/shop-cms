"use client"

import { FC } from "react"

import { useAuthModal } from "@/hooks/auth/useAuthModal"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"
import { Icons } from "@/components/ui/Icons"
import { Text } from "@/components/ui/Text"

import { AuthModalForm } from "./AuthModalForm"

interface AuthModalProps {
  open?: boolean
}

const AuthModal: FC<AuthModalProps> = ({ open = false }) => {
  const { open: modalOpen, onOpen, setOpen, view } = useAuthModal()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (open) {
    onOpen()
  }

  if (isDesktop) {
    return (
      <Dialog open={modalOpen} onOpenChange={setOpen}>
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

  return (
    <Drawer open={modalOpen} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <Icons.Logo className="mx-auto h-8 w-8 mb-3" />
            <Text type="h3" className="text-center">
              {view === "sign-in" && "Sign In"}
              {view === "sign-up" && "Sign Up"}
              {view === "forgot" && "Reset Password"}
            </Text>
          </DrawerTitle>
        </DrawerHeader>
        <AuthModalForm />
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  )
}

export { AuthModal }
