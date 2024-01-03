import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export type NavItem = {
  title: string
  id: string
  href: string
}

export function useAnimatedNav({
  navItems,
  initialItemId,
  onChange,
}: {
  navItems: NavItem[]
  initialItemId?: string | undefined
  onChange?: (id: string) => void
}) {
  const pathname = usePathname()

  const [[selectedItemIndex, direction], setSelectedItem] = useState(() => {
    const pathIndex = navItems.findIndex((item) => item.href === pathname)
    const defaultIndex = initialItemId
      ? navItems.findIndex((item) => item.id === initialItemId)
      : -1

    return [pathIndex !== -1 ? pathIndex : defaultIndex, 0]
  })

  useEffect(() => {
    // Reset selectedItemIndex to -1 if pathname is "/"
    if (pathname === "/") {
      setSelectedItem([-1, 0])
    }
  }, [pathname])

  return {
    itemProps: {
      navItems,
      selectedItemIndex,
      onChange,
      setSelectedItem,
    },
    selectedItem: selectedItemIndex !== -1 ? navItems[selectedItemIndex] : undefined,
    contentProps: {
      direction,
      selectedItemIndex,
    },
  }
}
