"use client"

import { useState, type FC } from "react"

import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { useUserMenu } from "@/hooks/useUserMenu"
import { Button } from "@/components/ui/Buttonn"

const MenuIcon: FC = () => {
  const { open, setOpen } = useUserMenu()

  const onClick = (): void => {
    setOpen(!open)
  }

  return (
    <Button variant="ghost" size="icon">
      <svg
        className={cn(open ? "menu-open" : "", "menu-icon h-14 w-14")}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      >
        <path
          className="menu-icon-top"
          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
        />
        <path className="menu-icon-middle" d="m 30,50 h 40" />
        <path
          className="menu-icon-bottom"
          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
        />
      </svg>
    </Button>
  )
}

export { MenuIcon }
