"use client"

import { useEffect, type FC } from "react"
import type { Session } from "@supabase/gotrue-js/src/lib/types"

import { useSessionStore } from "@/lib/stores/session"

interface SessionProviderProps {
  session: Session | null
}

const SessionProvider: FC<SessionProviderProps> = ({ session }) => {
  const { setSession } = useSessionStore()

  useEffect(() => {
    if (session) {
      setSession(session)
    }
  }, [session, setSession])

  return null
}

export { SessionProvider }
