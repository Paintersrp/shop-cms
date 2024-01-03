import type { FC } from "react"

import { Container } from "@/components/shop/Container"

interface PageProps {
  params: { categoryId: string }
}

const Page: FC<PageProps> = ({ params }) => {
  return (
    <Container>
      <div className="text-2xl font-bold min-h-[80vh]">{params.categoryId}</div>
    </Container>
  )
}

export default Page
