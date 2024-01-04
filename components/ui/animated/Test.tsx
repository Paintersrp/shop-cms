"use client"

import { FC, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface AnimatedSidebarProps {
  // Add your prop types here
}

const variants = {
  open: {
    width: "250px",
    height: "100vh",
    opacity: 1,
    clipPath: "circle(150% at 5px 5px)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  closed: {
    width: "0px",
    height: "0px",
    opacity: 1,
    clipPath: "circle(15px at 15px 15px)",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
}

const AnimatedSidebar: FC<AnimatedSidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="bg-primary relative">
      {/* Button container */}
      <div className="fixed top-2 left-2 z-[1]">
        <motion.button
          onClick={handleToggle}
          className="flex justify-center items-center w-10 h-10"
        >
          <svg
            className={cn(isOpen ? "menu-open" : "", "menu-icon h-20 w-20")}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
          >
            <path
              className="menu-icon-top"
              d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
            />
            <path className="menu-icon-middle" d="m 30,50 h 40" />
            <path
              className="menu-icon-bottom"
              d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
            />
          </svg>
        </motion.button>
      </div>

      {/* Sidebar */}
      <motion.div
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed top-0 left-0 flex justify-start items-start bg-accent"
        style={{ transformOrigin: "top left" }} // Set transform origin to top left
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="ml-12"
          >
            Sidebar Content
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export { AnimatedSidebar }
