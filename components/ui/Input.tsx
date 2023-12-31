import { forwardRef, type InputHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `
            flex 
            h-10 
            w-full
            rounded-md 
            border 
            border-input 
            bg-background 
            font-medium 
            px-3 
            py-2 
            text-sm 
            dark:text-white
            text-black 
            ring-offset-background 

            file:border-0 
            file:bg-transparent 
            file:text-sm 
            file:font-medium 

            placeholder:font-normal 
            placeholder:text-muted-foreground 

            focus-visible:outline-none 
            focus-visible:ring-2 
            focus-visible:ring-ring 
            focus-visible:ring-offset-2 

            disabled:cursor-not-allowed 
            disabled:opacity-50
          `,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }
