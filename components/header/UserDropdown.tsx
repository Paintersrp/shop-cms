"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { useUserStore } from "@/lib/stores/user"
import { cn } from "@/lib/utils"
import { useUserMenu } from "@/hooks/useUserMenu"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/Icons"

import { useAuth } from "../auth/useAuth"
import { useAuthModal } from "../auth/useAuthModal"

export function UserDropdownMenu() {
  const { open, setOpen } = useUserMenu()
  const { user } = useUserStore()
  const { onOpen, setView } = useAuthModal()
  const { signOut } = useAuth()

  const handleOpenSignIn = () => {
    setView("sign-in")
    onOpen()
  }

  const handleOpenSignUp = () => {
    setView("sign-up")
    onOpen()
  }

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg
            className={cn(open ? "menu-open" : "", "menu-icon h-20 w-20")}
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {/* User Links */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icons.User className="mr-2.5 h-5 w-5" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Icons.Settings className="mr-2.5 h-5 w-5" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Outside Links */}
        <DropdownMenuItem asChild>
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Icons.GitHub className="mr-2.5 h-5 w-5" />
            <span>GitHub</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={siteConfig.links.email} target="_blank" rel="noreferrer">
            <Icons.Contact className="mr-2.5 h-5 w-5" />
            <span>Contact</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* Auth Actions */}
        {user ? (
          <DropdownMenuItem onClick={signOut}>
            <Icons.LogOut className="mr-2.5 h-5 w-5" />
            <span>Log out</span>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem onClick={handleOpenSignUp}>
              <Icons.Register className="mr-2.5 h-5 w-5" />
              <span>Register</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleOpenSignIn}>
              <Icons.Login className="mr-2.5 h-5 w-5" />
              <span>Sign in</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
