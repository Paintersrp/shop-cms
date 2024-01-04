import type { FC, ReactNode } from "react"
import { ProductRecord } from "@/actions/products"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { Separator } from "@/components/ui/Separator"
import { Currency } from "@/components/shop/Currency"

interface InfoItemProps {
  title: string
  children: ReactNode
}

const InfoItem: FC<InfoItemProps> = ({ title, children }) => {
  return (
    <div className="flex items-center gap-x-4">
      <h3 className="font-semibold text-black">{title}:</h3>
      {children}
    </div>
  )
}

export { InfoItem }

interface InfoProps {
  data: ProductRecord
}

const Info: FC<InfoProps> = ({ data }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>

      <Currency value={data.price} className="text-lg text-gray-900 mt-1" />

      <Separator className="my-4" />
      <div className="flex flex-col gap-y-4">
        <InfoItem title="Size">
          <div>{data.size.name}</div>
        </InfoItem>
        <InfoItem title="Color">
          <div
            className="h-6 w-6 rounded border-gray-600"
            style={{ backgroundColor: data.color.value }}
          />
        </InfoItem>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">
          Add to Cart
          <Icons.ShoppingCart className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

export { Info }
