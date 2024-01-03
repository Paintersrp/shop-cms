"use client"

import type { FC } from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { TooltipWrapper } from "@/components/ui/Tooltip"

interface ThemeToggleProps {
  variant?:
    | "link"
    | "outline"
    | "default"
    | "destructive"
    | "slate"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "ghost"
    | null
    | undefined
}

const ThemeToggle: FC<ThemeToggleProps> = ({ variant }) => {
  const { setTheme, theme } = useTheme()

  return (
    <TooltipWrapper content={theme === "light" ? "Swap to Dark" : "Swap to Light"}>
      <Button
        variant={variant}
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Icons.Sun className="h-[1.35rem] sm:h-[1.35rem] w-[1.35rem] sm:w-[1.35rem] dark:hidden" />
        <Icons.Moon className="hidden h-[1.35rem] sm:h-[1.35rem] w-[1.35rem] sm:w-[1.35rem] dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </TooltipWrapper>
  )
}

ThemeToggle.defaultProps = {
  variant: "ghost",
}

export { ThemeToggle }
