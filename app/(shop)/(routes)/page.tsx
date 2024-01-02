import type { FC } from "react"
import getBillboard from "@/actions/billboard"

import { Billboard } from "@/components/shop/Billboard"
import { Container } from "@/components/shop/Container"

export const revalidate = 0

const ShopPage: FC = async () => {
  const billboard = await getBillboard("12")

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  )
}

export default ShopPage
