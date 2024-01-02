"use client"

import type { FC } from "react"
import { useParams } from "next/navigation"

interface DashboardPageProps {
  // Add your prop types here
}

const StorePage: FC<DashboardPageProps> = ({}) => {
  const params = useParams()

  return <div>Dashboard: {params.shopSlug}</div>
}

export default StorePage
