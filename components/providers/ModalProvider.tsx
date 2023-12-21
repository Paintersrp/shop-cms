"use client"

import { useEffect, useState, type FC } from "react"

import { ShopModal } from "@/components/modals/ShopModal"

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <ShopModal />
}

export { ModalProvider }
