"use client"

import type { FC } from "react"
import { useParams, useRouter } from "next/navigation"

import { useOrigin } from "@/hooks/useOrigin"

import { ApiItem } from "./ApiItem"

interface ApiListProps {
  entityName: string
  entityIdName: string
}

const ApiList: FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const { shopSlug } = useParams()
  const origin = useOrigin()

  const baseUrl = `${origin}/api/${shopSlug}`
  return (
    <>
      <ApiItem title="GET" description={`${baseUrl}/${entityName}`} variant="public" />
      <ApiItem
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiItem title="POST" description={`${baseUrl}/${entityName}`} variant="admin" />
      <ApiItem
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      <ApiItem
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </>
  )
}

export { ApiList }
