import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react"
import type {
  EmblaOptionsType as CarouselApi,
  EmblaOptionsType as CarouselOptions,
  EmblaPluginType as CarouselPlugin,
} from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { AnimatePresence, HTMLMotionProps, Variants, motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

interface CarouselAnimateOptions {
  type: "scale" | "none"
  factor: number
}

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin[]
  orientation?: "horizontal" | "vertical"
  animate: CarouselAnimateOptions
  setApi?: (api: any) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void | undefined
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollSnaps: number[]
  selectedIndex: number
  scrollProgress: number
  scaleValues: number[]
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & CarouselProps>(
  (
    {
      orientation = "horizontal",
      animate = { type: "scale", factor: 1 },
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )

    const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
    const [canScrollNext, setCanScrollNext] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const [scrollProgress, setScrollProgress] = useState<number>(0)
    const [scaleValues, setScaleValues] = useState<number[]>([])

    const onInit = useCallback((api: any) => {
      setScrollSnaps(api.scrollSnapList())
    }, [])

    const onSelect = useCallback((api: any) => {
      if (!api) {
        return
      }

      setSelectedIndex(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const onScroll = useCallback(
      (api: any) => {
        const progress = Math.max(0, Math.min(1, api.scrollProgress()))
        setScrollProgress(progress * 100)

        const engine = api.internalEngine()
        const scrollProgress = api.scrollProgress()

        const scaleStyles = api.scrollSnapList().map((scrollSnap: number, index: number) => {
          let diffToTarget = scrollSnap - scrollProgress

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem: any) => {
              const target = loopItem.target()

              if (index === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            })
          }
          const tweenValue = 1 - Math.abs(diffToTarget * animate.factor)

          return numberWithinRange(tweenValue, 0, 1)
        })

        setScaleValues(scaleStyles)
      },
      [setScaleValues, animate.factor]
    )

    const scrollPrev = useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = useCallback(() => {
      api?.scrollNext()
    }, [api])

    const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    useEffect(() => {
      if (!api) {
        return
      }

      onInit(api)
      onSelect(api)
      onScroll(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      api.on("reInit", onScroll)
      api.on("scroll", () => {
        flushSync(() => onScroll(api))
      })

      return () => {
        api?.off("select", onSelect)
        api?.off("scroll", onScroll)
      }
    }, [api, onInit, onSelect, onScroll])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          animate,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          scrollSnaps,
          selectedIndex,
          scrollProgress,
          scaleValues,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)

const CarouselContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

const CarouselItem = forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & { index: number }>(
  ({ className, index, ...props }, ref) => {
    const { orientation, scaleValues, animate } = useCarousel()

    const motionProps = {
      animate: {
        scale: animate.type === "scale" && scaleValues.length > 0 ? scaleValues[index] : 1,
      },
      transition: {
        type: "tween",
        duration: 0.15,
      },
    }

    return (
      <motion.div
        initial={false}
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
        {...motionProps}
        {...props}
      />
    )
  }
)

type CarouselButtonAnimationsFn = (type: "prev" | "next") => Variants

const carouselButtonAnimations: CarouselButtonAnimationsFn = (type) => {
  const xValueMap = {
    prev: -100,
    next: 100,
  }

  const x = xValueMap[type]

  return {
    hidden: {
      opacity: 0,
      scale: 0,
      x,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      x,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }
}

const CarouselPrevious = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, variant = "default", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
      <AnimatePresence>
        {canScrollPrev && (
          <div
            className={cn(
              "absolute",
              orientation === "horizontal"
                ? "left-10 top-1/2 -translate-y-1/2"
                : "top-12 left-1/2 -translate-x-1/2 rotate-90",
              className
            )}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={carouselButtonAnimations("prev")}
            >
              <Button
                ref={ref}
                variant={variant}
                size={size}
                className="h-7 w-7 rounded-full"
                onClick={scrollPrev}
                {...props}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Previous slide</span>
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }
)

const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, variant = "default", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
      <AnimatePresence>
        {canScrollNext && (
          <div
            className={cn(
              "absolute",
              orientation === "horizontal"
                ? "right-10 top-1/2 -translate-y-1/2"
                : "top-12 left-1/2 -translate-x-1/2 rotate-90",
              className
            )}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={carouselButtonAnimations("next")}
            >
              <Button
                ref={ref}
                variant={variant}
                size={size}
                className="h-7 w-7 rounded-full"
                onClick={scrollNext}
                {...props}
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Next slide</span>
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }
)

const CarouselDots = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { scrollSnaps, scrollTo, selectedIndex, orientation } = useCarousel()

    return (
      <motion.div
        ref={ref}
        role="group"
        aria-roledescription="dots"
        className={cn(
          `
            z-[1] 
            sm:bottom-8 
            bottom-6
            absolute 
            left-0 
            right-0 
            flex 
            justify-center 
            items-center
            space-x-2
          `,
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
            scale: 0,
            y: 100,
          },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
        }}
        {...props}
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => scrollTo(index)}
            className={cn(
              `
                w-10 
                h-10 
                flex 
                items-center                                 
                
                after:content-[""]
                after:rounded-[0.2rem]
                after:w-full
                after:h-[0.25rem]
                sm:after:h-[0.3rem]
                after:bg-primary
                   
              `,
              index === selectedIndex ? "after:bg-primary-foreground" : ""
            )}
          />
        ))}
      </motion.div>
    )
  }
)

const CarouselProgress = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { scrollProgress, orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="progress"
        className={cn(
          `
            z-[1]
            absolute
            sm:top-9
            top-7
            left-0
            right-0
            rounded-[0.2rem]
            sm:h-[0.3rem]
            h-[0.2rem]
            ml-auto
            mr-auto
            cursor-none
            w-60
            max-w-[90%]
            overflow-hidden
            bg-black
            drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,1)]
          `,
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
        {...props}
      >
        <div
          className={cn(`
          bg-blue-400
            absolute
            w-full
            top-0
            bottom-0
            left-[-100%]
            drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,1)]
          `)}
          style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
        />
      </div>
    )
  }
)

Carousel.displayName = "Carousel"
CarouselContent.displayName = "CarouselContent"
CarouselItem.displayName = "CarouselItem"
CarouselPrevious.displayName = "CarouselPrevious"
CarouselNext.displayName = "CarouselNext"
CarouselDots.displayName = "CarouselDots"
CarouselProgress.displayName = "CarouselProgress"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselProgress,
}
