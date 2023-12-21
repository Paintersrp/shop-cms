import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type TextareaHTMLAttributes,
} from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)

    // Expose internal ref to parent components if forwardedRef is provided
    useImperativeHandle(forwardedRef, () => internalRef.current!)

    const resizeTextarea = () => {
      const textarea = internalRef.current

      if (textarea) {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    useEffect(() => {
      resizeTextarea()
    }, [props.value])

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={internalRef}
        {...props}
        onChange={(e) => {
          if (props.onChange) props.onChange(e)
          resizeTextarea()
        }}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
