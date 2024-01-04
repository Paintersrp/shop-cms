import type { FC } from "react"

import { cn, formatter } from "@/lib/utils"

interface CurrencyProps {
  value?: string | number
  className?: string
}

const Currency: FC<CurrencyProps> = ({ value, className }) => {
  return <div className={cn("font-semibold", className)}>{formatter.format(Number(value))}</div>
}

export { Currency }
