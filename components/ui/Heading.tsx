import type { FC } from "react"

import { Text } from "@/components/ui/Text"

interface HeadingProps {
  title: string
  description: string
}

const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export { Heading }
