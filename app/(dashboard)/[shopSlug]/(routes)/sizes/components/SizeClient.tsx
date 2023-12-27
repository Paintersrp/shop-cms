"use client"

import type { FC } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/Buttonn"
import { Separator } from "@/components/ui/Separator"
import { ApiList } from "@/components/ApiList"
import { Heading } from "@/components/Heading"
import { Icons } from "@/components/Iconss"
import { DataTable } from "@/components/tables/DataTable"

import { SizeColumn, SizeColumns } from "./SizeColumns"

interface SizeClientProps {
  data: SizeColumn[]
}

const SizeClient: FC<SizeClientProps> = ({ data }) => {
  const router = useRouter()
  const { shopSlug } = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Sizes (${data.length})`} description="Manage sizes for your shop" />
        <Button onClick={() => router.push(`/${shopSlug}/sizes/new`)}>
          <Icons.PlusCircle className="mr-2 h-5 w-5" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable filterKey="name" columns={SizeColumns} data={data} />

      <Heading title="API" description="API Calls for Sizes" className="pt-4" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  )
}

export { SizeClient }
