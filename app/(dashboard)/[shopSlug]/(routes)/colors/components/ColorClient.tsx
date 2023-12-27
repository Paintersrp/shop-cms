"use client"

import type { FC } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/Buttonn"
import { Separator } from "@/components/ui/Separator"
import { ApiList } from "@/components/ApiList"
import { Heading } from "@/components/Heading"
import { Icons } from "@/components/Iconss"
import { DataTable } from "@/components/tables/DataTable"

import { ColorColumn, ColorColumns } from "./ColorColumns"

interface ColorClientProps {
  data: ColorColumn[]
}

const ColorClient: FC<ColorClientProps> = ({ data }) => {
  const router = useRouter()
  const { shopSlug } = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Colors (${data.length})`} description="Manage colors for your shop" />
        <Button onClick={() => router.push(`/${shopSlug}/colors/new`)}>
          <Icons.PlusCircle className="mr-2 h-5 w-5" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable filterKey="name" columns={ColorColumns} data={data} />

      <Heading title="API" description="API Calls for Colors" className="pt-4" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  )
}

export { ColorClient }
