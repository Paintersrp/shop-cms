import { create } from "zustand"

interface ShopModalStore {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export const useShopModal = create<ShopModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}))
