"use client"

import { useEffect } from "react"

import { useSessionStore } from "@/lib/stores/session"
import { useShopModal } from "@/hooks/useShopModal"

const SetupPage = () => {
  const { open, onOpen } = useShopModal()
  const { session } = useSessionStore()

  useEffect(() => {
    if (!open) {
      onOpen()
    }
  }, [open, onOpen])

  return <div className="p-4">Setup</div>
}

export default SetupPage
