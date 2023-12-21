"use client"

import * as React from "react"
import type { Session } from "@supabase/gotrue-js/src/lib/types"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { Toaster } from "@/components/ui/Toaster"

import { ModalProvider } from "./ModalProvider"
import { SessionProvider } from "./SessionProvider"
import { TailwindIndicatorProvider } from "./TailwindIndicatorProvider"

export function Providers({
  children,
  session,
  ...props
}: ThemeProviderProps & { session: Session | null }) {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider session={session} />
      <ModalProvider />
      <Toaster />

      {children}

      <TailwindIndicatorProvider />
    </NextThemesProvider>
  )
}
