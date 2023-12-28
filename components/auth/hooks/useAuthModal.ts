import { create } from "zustand"

export type View = "sign-in" | "sign-up" | "forgot"

interface AuthModalStore {
  open: boolean
  onOpen: () => void
  onClose: () => void
  view: View
  setView: (view: View) => void
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
  view: "sign-in",
  setView: (view) => {
    set({ view })
  },
}))
