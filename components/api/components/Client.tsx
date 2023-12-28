"use client"

import type { FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"

import { capitalize } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"
import { ApiList } from "@/components/ApiList"
import { Heading } from "@/components/Heading"
import { Icons } from "@/components/Icons"
import { DataTable } from "@/components/tables/DataTable"

interface ClientProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  filterKey: string
  entityName: string
  entityIdName: string
}

const Client: FC<ClientProps<any>> = ({ data, columns, filterKey, entityName, entityIdName }) => {
  const router = useRouter()
  const { shopSlug } = useParams()

  const formattedEntityName = capitalize(entityName)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${formattedEntityName} (${data.length})`}
          description={`Manage ${entityName} for your shop`}
        />
        <Button onClick={() => router.push(`/${shopSlug}/${entityName}/new`)}>
          <Icons.PlusCircle className="mr-2 h-5 w-5" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable filterKey={filterKey} columns={columns} data={data} />

      <Heading title="API" description={`API Calls for ${formattedEntityName}`} className="pt-4" />
      <Separator />
      <ApiList entityName={entityName} entityIdName={entityIdName} />
    </>
  )
}

export { Client }
