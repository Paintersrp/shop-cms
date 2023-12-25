"use client"

import type { FC } from "react"
import { useParams } from "next/navigation"

interface StoreStorePageProps {
  // Add your prop types here
}

const StoreStorePage: FC<StoreStorePageProps> = ({}) => {
  const params = useParams()

  return <div>Dashboard: {params.storeName}</div>
}

export default StoreStorePage
