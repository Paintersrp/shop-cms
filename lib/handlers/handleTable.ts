import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"
import { capitalize } from "@/lib/utils"

interface TableHandlerConfig {
  tableName: string
  requiredFields: string[]
}

// Define a generic handler function for a specific table
const handleTable = ({ tableName, requiredFields }: TableHandlerConfig) => {
  return {
    async POST(req: Request, { params }: { params: { shopSlug: string } }) {
      try {
        const supabase = getServerClient()
        const { data } = await supabase.auth.getUser()

        if (!data.user) {
          return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!params.shopSlug) {
          return new NextResponse("Shop slug is required", { status: 400 })
        }

        const requestData = await req.json()

        // Validate all required fields are present in request
        for (const field of requiredFields) {
          if (!requestData[field]) {
            return new NextResponse(`${capitalize(field)} is required`, { status: 400 })
          }
        }

        // Validate authenticated user owns the shop
        const { data: shop } = await supabase
          .from("shops")
          .select()
          .eq("slug", params.shopSlug)
          .eq("userId", data.user.id)
          .single()

        if (!shop) {
          return new NextResponse("Unauthorized", { status: 403 })
        }

        // Create a new record
        const { data: record, error } = await supabase
          .from(tableName)
          .insert({ ...requestData, shop_slug: params.shopSlug })
          .select()
          .single()

        if (error) throw error

        if (!record) {
          return new NextResponse("Internal error", { status: 500 })
        }

        return NextResponse.json(record)
      } catch (error) {
        console.log(`[${tableName.toUpperCase()}_POST]`, error)

        return new NextResponse("Internal error", { status: 500 })
      }
    },

    async GET(_: Request, { params }: { params: { shopSlug: string } }) {
      try {
        const supabase = getServerClient()

        if (!params.shopSlug) {
          return new NextResponse("Shop slug is required", { status: 400 })
        }

        // Fetch records for the specified table and slug
        const { data: records, error } = await supabase
          .from(tableName)
          .select()
          .eq("shop_slug", params.shopSlug)

        if (error) throw error

        if (!records) {
          return new NextResponse("Internal error", { status: 500 })
        }

        return NextResponse.json(records)
      } catch (error) {
        console.log(`[${tableName.toUpperCase()}_GET]`, error)

        return new NextResponse("Internal error", { status: 500 })
      }
    },
  }
}

export { type TableHandlerConfig, handleTable }
