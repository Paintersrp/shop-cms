"use client"

import { useEffect } from "react"

import { useShopModal } from "@/hooks/admin/useShopModal"

const AdminPage = () => {
  const { open, onOpen } = useShopModal()

  useEffect(() => {
    if (!open) {
      onOpen()
    }
  }, [open, onOpen])

  return null
}

export default AdminPage
