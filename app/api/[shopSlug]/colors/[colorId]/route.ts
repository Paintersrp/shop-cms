import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"

export async function GET(_: Request, { params }: { params: { colorId: string } }) {
  try {
    const sb = getServerClient()

    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 })
    }

    const { data: color, error } = await sb.from("colors").select().eq("id", params.colorId)

    if (error) throw error

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { shopSlug: string; colorId: string } }
) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const { name, value } = await req.json()

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 })
    }

    if (!params.shopSlug) {
      return new NextResponse("Shop Slug is required", { status: 400 })
    }

    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 })
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

    const { data: color, error: colorError } = await sb
      .from("colors")
      .update({
        name: name,
        value: value,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.colorId)
      .select()

    if (colorError) throw colorError

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { shopSlug: string; colorId: string } }
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

    if (!params.colorId) {
      return new NextResponse("Size ID is required", { status: 400 })
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

    const { data: color, error } = await sb
      .from("colors")
      .delete()
      .eq("id", params.colorId)
      .select()

    if (error) throw error

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
