import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request, { params }: { params: { shopSlug: string } }) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.shopSlug) {
      return new NextResponse("Shop slug is required", { status: 400 })
    }

    const { name, billboardId } = await req.json()

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
    }

    const { data: shop } = await supabase
      .from("shops")
      .select()
      .eq("slug", params.shopSlug)
      .eq("userId", data.user.id)
      .single()

    if (!shop) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const { data: category, error } = await supabase
      .from("categories")
      .insert({ name: name, billboard_id: billboardId, shop_slug: params.shopSlug })
      .select()
      .single()

    if (error) throw error

    if (!category) {
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIES_POST]", error)

    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request, { params }: { params: { shopSlug: string } }) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (!params.shopSlug) {
      return new NextResponse("Shop slug is required", { status: 400 })
    }

    const { data: shop } = await supabase
      .from("shops")
      .select()
      .eq("slug", params.shopSlug)
      .single()

    if (!shop) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const { data: categories, error } = await supabase
      .from("categories")
      .select()
      .eq("shop_slug", params.shopSlug)

    if (error) throw error

    if (!categories) {
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(categories)
  } catch (error) {
    console.log("[CATEGORIES_GET]", error)

    return new NextResponse("Internal error", { status: 500 })
  }
}
