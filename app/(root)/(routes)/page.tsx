"use client"

import { useEffect } from "react"

import { useShopModal } from "@/hooks/useShopModal"

const SetupPage = () => {
  const { open, onOpen } = useShopModal()

  useEffect(() => {
    if (!open) {
      onOpen()
    }
  }, [open, onOpen])

  return null
}

export default SetupPage
