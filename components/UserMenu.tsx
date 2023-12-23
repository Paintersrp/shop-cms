"use client"

import type { FC } from "react"

import { useAuthModal } from "@/hooks/useAuthModal"

import { Icons } from "./Icons"
import { Button } from "./ui/Button"

const UserMenu: FC = () => {
  const { onOpen } = useAuthModal()

  return (
    <Button variant="ghost" size="icon" onClick={onOpen}>
      <Icons.login className="h-5 w-5" />
      <span className="sr-only">User Menu</span>
    </Button>
  )
}

export { UserMenu }
