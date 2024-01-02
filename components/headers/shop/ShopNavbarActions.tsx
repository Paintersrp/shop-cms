"use client"

import type { FC } from "react"

import { useMounted } from "@/hooks/useMounted"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { ThemeToggle } from "@/components/headers/ThemeToggle"

const ShopNavbarActions: FC = ({}) => {
  const mounted = useMounted()

  if (!mounted) return null

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <ThemeToggle />
      <Button className="rounded-full">
        <Icons.ShoppingBag size="20" />
        <span className="ml-2 text-sm font-medium">0</span>
      </Button>
    </div>
  )
}

export { ShopNavbarActions }
