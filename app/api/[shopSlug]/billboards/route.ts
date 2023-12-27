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

    const { label, image_url } = await req.json()

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!image_url) {
      return new NextResponse("Image URL is required", { status: 400 })
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

    const { data: billboard, error } = await supabase
      .from("billboards")
      .insert({ label, image_url: image_url, shop_slug: params.shopSlug })
      .select()
      .single()

    if (error) throw error

    if (!billboard) {
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error)

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

    const { data: billboards, error } = await supabase
      .from("billboards")
      .select()
      .eq("shop_slug", params.shopSlug)

    if (error) throw error

    if (!billboards) {
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(billboards)
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error)

    return new NextResponse("Internal error", { status: 500 })
  }
}
