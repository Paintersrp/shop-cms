"use client"

import { useState, type FC } from "react"

import { Tables } from "@/types/supabase"
import { AnimatedNav } from "@/components/ui/animated/AnimatedNav"
import { useAnimatedNav } from "@/components/ui/animated/hooks/useAnimatedNav"

interface ShopMainNavProps {
  data: Tables<"categories">[]
}

const ShopMainNav: FC<ShopMainNavProps> = ({ data }) => {
  const navItems = data.map((category) => ({
    href: `/category/${category.name}`,
    title: category.name,
    id: category.name,
  }))

  const [navProps] = useState({
    navItems,
    initialItemId: undefined,
  })

  const { itemProps } = useAnimatedNav(navProps)

  return <AnimatedNav {...itemProps} />
}

export { ShopMainNav }
