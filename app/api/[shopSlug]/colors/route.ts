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

    const { name, value } = await req.json()

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 })
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

    const { data: color, error } = await supabase
      .from("colors")
      .insert({ name: name, value: value, shop_slug: params.shopSlug })
      .select()
      .single()

    if (error) throw error

    if (!color) {
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLORS_POST]", error)

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

    const { data: colors, error } = await supabase
      .from("colors")
      .select()
      .eq("shop_slug", params.shopSlug)

    if (error) throw error

    if (!colors) {
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(colors)
  } catch (error) {
    console.log("[COLORS_GET]", error)

    return new NextResponse("Internal error", { status: 500 })
  }
}
