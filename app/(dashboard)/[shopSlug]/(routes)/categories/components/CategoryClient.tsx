"use client"

import type { FC } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/Buttonn"
import { Separator } from "@/components/ui/Separator"
import { ApiList } from "@/components/ApiList"
import { Heading } from "@/components/Heading"
import { Icons } from "@/components/Iconss"
import { DataTable } from "@/components/tables/DataTable"

import { CategoryColumn, CategoryColumns } from "./CategoryColumns"

interface CategoryClientProps {
  data: CategoryColumn[]
}

const CategoryClient: FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter()
  const { shopSlug } = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your shop"
        />
        <Button onClick={() => router.push(`/${shopSlug}/categories/new`)}>
          <Icons.PlusCircle className="mr-2 h-5 w-5" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable filterKey="name" columns={CategoryColumns} data={data} />

      <Heading title="API" description="API Calls for Categories" className="pt-4" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  )
}

export { CategoryClient }
