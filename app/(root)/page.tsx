"use client"

import { useEffect } from "react"

import { useUserStore } from "@/lib/stores/user"
import { useShopModal } from "@/hooks/useShopModal"

const SetupPage = () => {
  const { open, onOpen } = useShopModal()
  const { user } = useUserStore()

  // useEffect(() => {
  //   if (!open) {
  //     onOpen()
  //   }
  // }, [open, onOpen])

  return <div className="p-4">Setup</div>
}

export default SetupPage
