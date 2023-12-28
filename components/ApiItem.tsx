"use client"

import type { FC } from "react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { Badge, BadgeProps } from "@/components/ui/Badge"
import { Icons } from "@/components/Icons"

import { Button } from "./ui/Button"
import { TooltipWrapper } from "./ui/Tooltip"

interface ApiItemProps {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<ApiItemProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
}

const variantMap: Record<ApiItemProps["variant"], BadgeProps["variant"]> = {
  public: "default",
  admin: "destructive",
}

const ApiItem: FC<ApiItemProps> = ({ title, description, variant = "public" }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success("API Route copied to the clipboard")
  }

  return (
    <Alert>
      <AlertTitle className="flex items-center gap-x-2">
        <Icons.Server className="h-4 w-4" />
        {title}
        <Badge className="py-0" variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <TooltipWrapper content="Copy content">
          <Button variant="outline" size="icon" onClick={onCopy}>
            <Icons.Copy className="h-4 w-4" />
          </Button>
        </TooltipWrapper>
      </AlertDescription>
    </Alert>
  )
}

export { ApiItem }
