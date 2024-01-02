import type { FC, ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="px-6 sm:px-4 sm:container sm:py-4">{children}</div>
}

export { Container }
