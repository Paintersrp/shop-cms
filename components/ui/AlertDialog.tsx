import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/Button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      `
        fixed inset-0 
        z-50 
        bg-black/80

        data-[state=open]:animate-in 
        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=open]:fade-in-0
      `,
      className
    )}
    {...props}
    ref={ref}
  />
))

const AlertDialogContent = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        `
          fixed 
          left-[50%] 
          top-[50%] 
          z-50 
          p-6 
          grid 
          gap-4 
          w-full 
          max-w-lg 
          border 
          bg-background 
          shadow-lg 
          sm:rounded-lg

          duration-200 
          translate-x-[-50%]
          translate-y-[-50%] 

          data-[state=open]:animate-in 
          data-[state=closed]:animate-out 
          data-[state=closed]:fade-out-0 
          data-[state=open]:fade-in-0 
          data-[state=closed]:zoom-out-95 
          data-[state=open]:zoom-in-95 
          data-[state=closed]:slide-out-to-left-1/2 
          data-[state=closed]:slide-out-to-top-[48%] 
          data-[state=open]:slide-in-from-left-1/2 
          data-[state=open]:slide-in-from-top-[48%]           
        `,
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))

const AlertDialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex 
        flex-col 
        space-y-2 
        text-center 
        sm:text-left
      `,
      className
    )}
    {...props}
  />
)

const AlertDialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
      flex 
      flex-col-reverse 
      sm:flex-row 
      sm:justify-end 
      sm:space-x-2
      `,
      className
    )}
    {...props}
  />
)

const AlertDialogTitle = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      `
        text-lg 
        font-semibold
      `,
      className
    )}
    {...props}
  />
))

const AlertDialogDescription = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      `
        text-sm 
        text-muted-foreground
      `,
      className
    )}
    {...props}
  />
))

const AlertDialogAction = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Action>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
))

const AlertDialogCancel = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Cancel>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
))

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName
AlertDialogHeader.displayName = "AlertDialogHeader"
AlertDialogFooter.displayName = "AlertDialogFooter"
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
