"use client"

import { useEffect, useState, type FC } from "react"

import { ShopModal } from "@/components/modals/ShopModal"

import { AuthModal } from "../auth/AuthModal"

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <ShopModal />
      <AuthModal />
    </>
  )
}

export { ModalProvider }
