import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"
import { capitalize } from "@/lib/utils"

const REQUIRED_FIELDS = ["name", "price", "category_id", "color_id", "size_id", "images"]

export async function POST(req: Request, { params }: { params: { shopSlug: string } }) {
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

    console.log(requestData)

    // Validate all required fields are present in request
    for (const field of REQUIRED_FIELDS) {
      if (!requestData[field]) {
        return new NextResponse(`${capitalize(field)} is required`, { status: 400 })
      }
    }

    if (!requestData.images.length) {
      return new NextResponse("Image(s) are required", { status: 400 })
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

    const tableName = `${shop.type}_product`

    // Create a new record
    const { data: record, error } = await supabase
      .from(tableName)
      .insert({
        ...requestData,
        images: requestData.images.map((image: { url: string }) => image.url),
        shop_slug: params.shopSlug,
      })
      .select()
      .single()

    if (error) throw error

    if (!record) {
      return new NextResponse("Internal error", { status: 500 })
    }

    record.images = record.images.map((url: string) => ({ url }))

    return NextResponse.json(record)
  } catch (error) {
    console.log("[PRODUCTS_POST]", error)

    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request, { params }: { params: { shopSlug: string } }) {
  try {
    const supabase = getServerClient()
    const { data } = await supabase.auth.getUser()

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") || "retail"
    const categoryId = searchParams.get("categoryId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const isFeatured = searchParams.get("isFeatured") || undefined

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.shopSlug) {
      return new NextResponse("Shop slug is required", { status: 400 })
    }

    const tableName = `${type}_product`

    // Fetch records for the specified table and slug
    const query = supabase
      .from(tableName)
      .select(
        `*,
        categories (*),
        sizes (*),
        colors (*)`
      )
      .eq("shop_slug", params.shopSlug)

    if (categoryId) query.eq("category_id", categoryId)
    if (colorId) query.eq("color_id", colorId)
    if (sizeId) query.eq("size_id", sizeId)
    if (isFeatured) query.eq("is_featured", isFeatured)

    const { data: records, error } = await query

    if (error) throw error

    if (!records) {
      return new NextResponse("Internal error", { status: 500 })
    }

    records.forEach((record) => {
      record.images = record.images.map((url: string) => ({ url }))
    })

    return NextResponse.json(records)
  } catch (error) {
    console.log(`[PRODUCTS_GET]`, error)

    return new NextResponse("Internal error", { status: 500 })
  }
}
