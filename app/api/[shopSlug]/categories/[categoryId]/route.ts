import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"

export async function GET(_: Request, { params }: { params: { categoryId: string } }) {
  try {
    const sb = getServerClient()

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 })
    }

    const { data: category, error } = await sb
      .from("categories")
      .select()
      .eq("id", params.categoryId)

    if (error) throw error

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { shopSlug: string; categoryId: string } }
) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const { name, billboardId } = await req.json()

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
    }

    if (!params.shopSlug) {
      return new NextResponse("Shop Slug is required", { status: 400 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 })
    }

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

    const { data: category, error: categoryError } = await sb
      .from("categories")
      .update({
        name: name,
        billboard_id: billboardId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.categoryId)
      .select()

    if (categoryError) throw categoryError

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { shopSlug: string; categoryId: string } }
) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.shopSlug) {
      return new NextResponse("Shop Slug is required", { status: 400 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 })
    }

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

    const { data: category, error } = await sb
      .from("categories")
      .delete()
      .eq("id", params.categoryId)
      .select()

    console.log(error)

    if (error) throw error

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
