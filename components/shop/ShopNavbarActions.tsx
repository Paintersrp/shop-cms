"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

import { useAuthModal } from "@/hooks/auth/useAuthModal"
import { useMounted } from "@/hooks/useMounted"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { ThemeToggle } from "@/components/ui/composed/ThemeToggle"

const animationVariants = {
  initial: { opacity: 0, y: -15 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
}

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.25,
}

const ShopNavbarActions: FC = ({}) => {
  const mounted = useMounted()
  const { setView, onOpen } = useAuthModal()

  if (!mounted) return null

  return (
    <motion.div
      className="ml-auto flex items-center gap-x-2"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={animationVariants}
      transition={transition}
    >
      <ThemeToggle />
      <TooltipWrapper content="Login">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setView("sign-in")
            onOpen()
          }}
        >
          <Icons.Login className="h-[1.35rem] w-[1.35rem]" />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper content="View Cart">
        <Button variant="outline" size="iconWithText" className="rounded-full">
          <Icons.ShoppingBag className="h-[1.35rem] w-[1.35rem]" />
          <span className="ml-2 font-semibold">0</span>
        </Button>
      </TooltipWrapper>
    </motion.div>
  )
}

export { ShopNavbarActions }
