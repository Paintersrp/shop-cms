import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"
import { capitalize } from "@/lib/utils"

interface ObjectHandlerConfig {
  tableName: string
  objectName: string
  idField: string
  requiredFields: string[]
}

// Define a generic handler function for a specific table's objects by ID
const handleObjects = ({ tableName, objectName, idField, requiredFields }: ObjectHandlerConfig) => {
  return {
    async GET(_: Request, { params }: { params: { [key: string]: string } }) {
      try {
        const sb = getServerClient()

        if (!params[idField]) {
          return new NextResponse(`${objectName} ID is required`, { status: 400 })
        }

        const { data: object, error } = await sb.from(tableName).select().eq("id", params[idField])

        if (error) throw error

        return NextResponse.json(object)
      } catch (error) {
        console.log(`[${objectName.toUpperCase()}_GET]`, error)
        return new NextResponse("Internal error", { status: 500 })
      }
    },

    async PATCH(req: Request, { params }: { params: { [key: string]: string } }) {
      try {
        const sb = getServerClient()
        const { data } = await sb.auth.getUser()

        // Validate user is authenticated
        if (!data.user) {
          return new NextResponse("Unauthenticated", { status: 401 })
        }

        const requestData = await req.json()

        // Validate all required fields are present in request
        for (const field of requiredFields) {
          if (!requestData[field]) {
            return new NextResponse(`${capitalize(field)} is required`, { status: 400 })
          }
        }

        if (!params.shopSlug) {
          return new NextResponse("Shop slug is required", { status: 400 })
        }

        if (!params[idField]) {
          return new NextResponse(`${objectName} ID is required`, { status: 400 })
        }

        // Verify authenticated user is owner of shop slug
        const { data: shop, error: shopError } = await sb
          .from("shops")
          .select()
          .eq("slug", params.shopSlug)
          .eq("userId", data.user.id)
          .single()

        if (shopError) throw shopError

        if (!shop) {
          return new NextResponse("Unauthorized", { status: 403 })
        }

        const { data: object, error: objectError } = await sb
          .from(tableName)
          .update({
            ...requestData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", params[idField])
          .select()

        if (objectError) throw objectError

        return NextResponse.json(object)
      } catch (error) {
        console.log(`[${objectName.toUpperCase()}_PATCH]`, error)
        return new NextResponse("Internal error", { status: 500 })
      }
    },

    async DELETE(_: Request, { params }: { params: { [key: string]: string } }) {
      try {
        const sb = getServerClient()
        const { data } = await sb.auth.getUser()

        if (!data.user) {
          return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!params[idField]) {
          return new NextResponse(`${objectName} ID is required`, { status: 400 })
        }

        const { data: object, error } = await sb
          .from(tableName)
          .delete()
          .eq("id", params[idField])
          .select()

        if (error) throw error

        return NextResponse.json(object)
      } catch (error) {
        console.log(`[${objectName.toUpperCase()}_DELETE]`, error)
        return new NextResponse("Internal error", { status: 500 })
      }
    },
  }
}

export { type ObjectHandlerConfig, handleObjects }
