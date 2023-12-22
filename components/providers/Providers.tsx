"use client"

import type { User } from "@supabase/gotrue-js/src/lib/types"
import { ThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { Toaster } from "@/components/ui/Toaster"

import { TooltipProvider } from "../ui/Tooltip"
import { ModalProvider } from "./ModalProvider"
import { TailwindIndicatorProvider } from "./TailwindIndicatorProvider"
import { UserProvider } from "./SessionProvider"

export function Providers({
  children,
  user,
  ...props
}: ThemeProviderProps & { user: User | null }) {
  return (
    <ThemeProvider {...props}>
      <UserProvider user={user} />
      <ModalProvider />
      <Toaster />

      <TooltipProvider delayDuration={0} skipDelayDuration={500}>
        {children}
      </TooltipProvider>

      <TailwindIndicatorProvider />
    </ThemeProvider>
  )
}
