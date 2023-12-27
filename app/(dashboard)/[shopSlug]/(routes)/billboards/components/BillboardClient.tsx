"use client"

import type { FC } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/Buttonn"
import { Separator } from "@/components/ui/Separator"
import { ApiList } from "@/components/ApiList"
import { Heading } from "@/components/Heading"
import { Icons } from "@/components/Iconss"
import { DataTable } from "@/components/tables/DataTable"

import { BillboardColumn, BillboardColumns } from "./BillboardsColumns"

interface BillboardClientProps {
  data: BillboardColumn[]
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter()
  const { shopSlug } = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your shop"
        />
        <Button onClick={() => router.push(`/${shopSlug}/billboards/new`)}>
          <Icons.PlusCircle className="mr-2 h-5 w-5" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable filterKey="label" columns={BillboardColumns} data={data} />

      <Heading title="API" description="API Calls for Billboards" className="pt-4" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
}

export { BillboardClient }
