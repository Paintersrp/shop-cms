import { getServerClient } from "@/lib/supabase/hook"

export interface BillboardRecord {
  created_at: string
  id: number
  image_url: string
  label: string
  shop_slug: string
  updated_at: string
  images: {
    alt: string
    caption: string
    image: {
      created_at: string
      updated_at: string
      id: string
      url: string
    }
  }[]
}

const getBillboard = async (id: string): Promise<BillboardRecord | undefined> => {
  try {
    const supabase = getServerClient()
    const { data: user } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Unauthenticated - 401")
    }

    if (!id) {
      throw new Error("ID is required")
    }

    const { data: record, error } = await supabase
      .from("billboards")
      .select(
        `
          *,
          images: billboards_images!inner (*,
            image: images!inner (*)
          )
        `
      )
      .eq("id", id)
      .single()

    if (error) throw error

    if (!record) {
      throw new Error("Billboard not found")
    }

    return record as BillboardRecord
  } catch (error) {
    console.error(`[BILLBOARD_GET_ACTION]`, error)
    return undefined
  }
}

export default getBillboard
