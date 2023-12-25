"use client"

import type { User } from "@supabase/gotrue-js/src/lib/types"
import { ThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { Toaster } from "@/components/ui/Sonner"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { ModalProvider, TailwindIndicatorProvider, UserProvider } from "@/components/providers"

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
