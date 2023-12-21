import type { Session } from "@supabase/gotrue-js/src/lib/types"
import { create } from "zustand"

interface SessionState {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}))
