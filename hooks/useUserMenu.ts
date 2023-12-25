import { create } from "zustand"

interface UserMenuStore {
  open: boolean
  setOpen: (value: boolean) => void
}

export const useUserMenu = create<UserMenuStore>((set) => ({
  open: false,
  setOpen: (value: boolean) => set({ open: value }),
}))
