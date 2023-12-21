import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data } = await supabase.auth.getSession()

    if (!data.session) {
      return new NextResponse("Not authenticated", { status: 401 })
    }

    const userId = data.session.user.id
    const { name } = await req.json()

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const { data: shop } = await supabase.from("shops").insert({ userId, name }).select()

    if (!shop) {
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(shop)
  } catch (error) {
    console.log("[STORES_POST]", error)

    return new NextResponse("Internal error", { status: 500 })
  }
}
