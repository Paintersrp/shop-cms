import { NextResponse } from "next/server"

import { getServerClient } from "@/lib/supabase/hook"

export async function PATCH(req: Request, { params }: { params: { storeName: string } }) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const { name } = await req.json()

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!params.storeName) {
      return new NextResponse("Store Name is required", { status: 400 })
    }

    const { data: shop, error } = await sb
      .from("shops")
      .update({ name: name })
      .eq("name", params.storeName)
      .eq("userId", data.user.id)
      .select()

    if (error) throw error

    return NextResponse.json(shop)
  } catch (error) {
    console.log("[STORE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { storeName: string } }) {
  try {
    const sb = getServerClient()
    const { data } = await sb.auth.getUser()

    if (!data.user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.storeName) {
      return new NextResponse("Store Name is required", { status: 400 })
    }

    const { data: shop, error } = await sb
      .from("shops")
      .delete()
      .eq("name", params.storeName)
      .eq("userId", data.user.id)
      .select()

    if (error) throw error

    return NextResponse.json(shop)
  } catch (error) {
    console.log("[STORE_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
