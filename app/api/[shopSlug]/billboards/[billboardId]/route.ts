import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"

export async function GET(_: Request, { params }: { params: { billboardId: string } }) {
  try {
    const sb = getServerClient()

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
    }

    const { data: billboard, error } = await sb
      .from("billboards")
      .select()
      .eq("id", params.billboardId)

    if (error) throw error

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { shopSlug: string; billboardId: string } }
) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const { label, image_url } = await req.json()

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!image_url) {
      return new NextResponse("Image Url is required", { status: 400 })
    }

    if (!params.shopSlug) {
      return new NextResponse("Shop Slug is required", { status: 400 })
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
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

    const { data: billboard, error: billboardError } = await sb
      .from("billboards")
      .update({
        label: label,
        image_url: image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.billboardId)
      .select()

    if (billboardError) throw billboardError

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { shopSlug: string; billboardId: string } }
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

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
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

    const { data: billboard, error } = await sb
      .from("billboards")
      .delete()
      .eq("id", params.billboardId)
      .select()

    if (error) throw error

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
