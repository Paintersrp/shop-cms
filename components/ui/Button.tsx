import { forwardRef, type ButtonHTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
    inline-flex 
    items-center 
    justify-center 
    rounded-md 
    text-sm 
    font-medium 
    transition-colors   
    disabled:opacity-50 
    disabled:pointer-events-none  
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary 
          text-primary-foreground 
          hover:bg-primary/90
        `,
        destructive: `
          bg-destructive 
          text-destructive-foreground 
          hover:bg-destructive/80
        `,
        slate: `
          dark:bg-slate-700 
          bg-slate-400 
          text-white 
          hover:bg-slate-400/90 
          dark:hover:bg-slate-700/90
        `,
        outline: `
          border 
          border-input 
          hover:bg-accent 
          hover:text-accent-foreground
        `,
        primary: `
          bg-primary 
          text-primary-foreground 
          hover:bg-primary/90
        `,
        secondary: `
          bg-secondary 
          text-secondary-foreground 
          hover:bg-secondary/90
        `,
        accent: `
          bg-accent 
          text-accent-foreground 
          dark:hover:bg-accent/80 
          hover:bg-accent/70
        `,
        success: `
          bg-success 
          text-success-foreground 
          hover:bg-success/90
        `,
        ghost: `
          hover:bg-accent 
          hover:text-accent-foreground
        `,
        link: `
          underline-offset-4 
          hover:underline 
          text-primary
        `,
        draw: `
          group
          relative
          transition-colors 
          duration-[400ms]        
          hover:text-accent-foreground
        `,
      },
      size: {
        default: "h-10 py-2 px-4",
        xs: "px-2 rounded-md",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
        iconSm: "h-7 w-7",
        iconWithText: "h-10 w-16",
      },
      focus: {
        default: `
          focus-visible:outline-none 
          focus-visible:ring-2 
          focus-visible:ring-ring 
          focus-visible:ring-offset-2
          ring-offset-background
        `,
        off: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      focus: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, isLoading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}

        {/* Looks okay.. */}
        {variant === "draw" && (
          <>
            {/* TOP */}
            <span className="absolute left-0 top-0 h-[1px] w-0 bg-primary transition-all duration-100 group-hover:w-full" />

            {/* RIGHT */}
            <span className="absolute right-0 top-0 h-0 w-[1px] bg-primary transition-all delay-100 duration-100 group-hover:h-full" />

            {/* BOTTOM */}
            <span className="absolute bottom-0 right-0 h-[1px] w-0 bg-primary transition-all delay-200 duration-100 group-hover:w-full" />

            {/* LEFT */}
            <span className="absolute bottom-0 left-0 h-0 w-[1px] bg-primary transition-all delay-300 duration-100 group-hover:h-full" />
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
