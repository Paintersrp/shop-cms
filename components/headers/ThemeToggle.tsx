"use client"

import type { FC } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"
import { TooltipWrapper } from "@/components/ui/Tooltip"

import { Icons } from "../ui/Icons"

const ThemeToggle: FC = () => {
  const { setTheme, theme } = useTheme()

  return (
    <TooltipWrapper content={theme === "light" ? "Swap to Dark" : "Swap to Light"}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Icons.Sun className="h-6 sm:h-6 w-6 sm:w-6 dark:hidden" />
        <Icons.Moon className="hidden h-6 sm:h-6 w-6 sm:w-6 dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </TooltipWrapper>
  )
}

export { ThemeToggle }
