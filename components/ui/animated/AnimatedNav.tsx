import { useEffect, useRef, useState, type FC } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { NavItem } from "@/components/ui/animated/hooks/useAnimatedNav"

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.25,
}

type AnimatedNavProps = {
  navItems: NavItem[]
  selectedItemIndex: number
  setSelectedItem: (input: [number, number]) => void
}

const AnimatedNav: FC<AnimatedNavProps> = ({
  navItems,
  selectedItemIndex,
  setSelectedItem,
}): JSX.Element => {
  // Initialize router to push navigation
  const router = useRouter()

  // Initialize button refs for ...[add more here]
  const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, navItems.length))
  }, [navItems.length])

  const navRef = useRef<HTMLDivElement>(null)
  const navRect = navRef.current?.getBoundingClientRect()

  const selectedRect =
    selectedItemIndex !== -1 ? buttonRefs[selectedItemIndex]?.getBoundingClientRect() : null

  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null)
  const hoveredRect = buttonRefs[hoveredItemIndex ?? -1]?.getBoundingClientRect()

  return (
    <nav
      ref={navRef}
      className={`
        flex 
        flex-shrink-0 
        justify-center 
        items-center 
        relative 
        z-0 
        py-2 
        mx-6
      `}
      onPointerLeave={() => setHoveredItemIndex(null)}
    >
      {navItems.map((item, i) => {
        const isActive = hoveredItemIndex === i || selectedItemIndex === i

        const activeClass = isActive
          ? "dark:text-white/90 text-black/90"
          : "dark:text-white/60 text-black/70"

        return (
          <motion.button
            key={i}
            className={cn(
              `
               relative
               rounded-md 
               flex 
               items-center 
               h-8 
               px-4 
               z-20 
               bg-transparent 
               cursor-pointer 
               font-medium 
               select-none 
               transition-colors 

               dark:hover:text-white
               hover:text-black
              `,
              activeClass
            )}
            ref={(el) => (buttonRefs[i] = el)}
            onPointerEnter={() => {
              setHoveredItemIndex(i)
            }}
            onFocus={() => {
              setHoveredItemIndex(i)
            }}
            onClick={() => {
              setSelectedItem([i, i > selectedItemIndex ? 1 : -1])
              router.push(item.href)
            }}
          >
            {item.title}
          </motion.button>
        )
      })}

      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key="hover"
            className={`
              absolute 
              p-1 
              mb-1 
              z-10 
              top-0 
              left-0 
              rounded-md 
              bg-accent
            `}
            initial={{
              x: hoveredRect.left - navRect.left,
              y: hoveredRect.top - navRect.top,
              width: hoveredRect.width,
              height: hoveredRect.height,
              opacity: 0,
            }}
            animate={{
              x: hoveredRect.left - navRect.left,
              y: hoveredRect.top - navRect.top,
              width: hoveredRect.width,
              height: hoveredRect.height,
              opacity: 1,
            }}
            exit={{
              x: hoveredRect.left - navRect.left,
              y: hoveredRect.top - navRect.top,
              width: hoveredRect.width,
              height: hoveredRect.height,
              opacity: 0,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>

      {selectedRect && navRect && (
        <motion.div
          className={`
            absolute z-10 
            bottom-0 
            left-0.5 
            h-[1.5px] 

            bg-zinc-700 
            dark:bg-zinc-200
          `}
          animate={{
            width: selectedRect.width * 0.8,
            x: `calc(${selectedRect.left - navRect.left}px + 10%)`,
            opacity: 1,
          }}
          transition={transition}
        />
      )}
    </nav>
  )
}

export { AnimatedNav }
