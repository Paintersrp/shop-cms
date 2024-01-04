"use client"

import type { FC } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ProductRecord } from "@/actions/products"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card"
import { Icons } from "@/components/ui/Icons"
import { Currency } from "@/components/shop/Currency"

interface ProductCardProps {
  data: ProductRecord
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  return (
    <Card className="rounded-xl group cursor-pointer" onClick={handleClick}>
      <CardContent className="p-3 space-y-1.5">
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={data.images[0]}
            fill
            alt="Image"
            className="aspect-square object-cover rounded-md"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <Button variant="icon" size="icon">
                <Icons.Expand className="h-6 w-6" />
              </Button>
              <Button variant="icon" size="icon">
                <Icons.ShoppingCart className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        <CardTitle className="text-lg">{data.name}</CardTitle>
        <CardDescription>{data.category.name}</CardDescription>
        <div className="flex items-center justify-between pt-2">
          <Currency value={data.price} />
        </div>
      </CardContent>
    </Card>
  )
}

export { ProductCard }
