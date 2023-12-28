import { NextResponse } from "next/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

import { getServerClient } from "@/lib/supabase/hook"
import { capitalize } from "@/lib/utils"

const REQUIRED_FIELDS = ["name", "price", "category_id", "color_id", "size_id", "images"]

export async function GET(
  _: Request,
  { params }: { params: { productId: string; shopSlug: string } }
) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    console.log("here")

    // Validate user is authenticated
    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.productId) {
      return new NextResponse(`Product ID is required`, { status: 400 })
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

    const tableName = `${shop.type}_product`

    const { data: object, error } = await sb
      .from(tableName)
      .select(
        `
      *,
      categories (*),
      sizes (*),
      colors (*)`
      )
      .eq("id", params.productId)
      .single()

    if (error) throw error

    object.images = object.images.map((url: string) => ({ url }))

    return NextResponse.json(object)
  } catch (error) {
    console.log(`[PRODUCT_GET]`, error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; shopSlug: string } }
) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    // Validate user is authenticated
    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.shopSlug) {
      return new NextResponse("Shop slug is required", { status: 400 })
    }

    if (!params.productId) {
      return new NextResponse(`Product ID is required`, { status: 400 })
    }

    const requestData = await req.json()

    // Validate all required fields are present in request
    for (const field of REQUIRED_FIELDS) {
      if (!requestData[field]) {
        return new NextResponse(`${capitalize(field)} is required`, { status: 400 })
      }
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

    const tableName = `${shop.type}_product`

    const { data: object, error: objectError } = await sb
      .from(tableName)
      .update({
        ...requestData,
        images: requestData.images.map((image: { url: string }) => image.url),
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.productId)
      .select()
      .single()

    if (objectError) throw objectError

    object.images = object.images.map((url: string) => ({ url }))

    return NextResponse.json(object)
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { productId: string; shopSlug: string } }
) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.shopSlug) {
      return new NextResponse("Shop slug is required", { status: 400 })
    }

    if (!params.productId) {
      return new NextResponse(`Product ID is required`, { status: 400 })
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

    const tableName = `${shop.type}_product`

    const { data: object, error } = await sb
      .from(tableName)
      .delete()
      .eq("id", params.productId)
      .select()

    if (error) throw error

    return NextResponse.json(object)
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
