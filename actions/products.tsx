import { shopSiteConfig } from "@/config/shop"
import { getServerClient } from "@/lib/supabase/hook"

interface Query {
  categoryId?: number
  colorId?: number
  sizeId?: number
  isFeatured?: boolean
  type?: string
}

export interface ProductRecord {
  created_at: string
  updated_at: string
  id: number
  shop_slug: string
  category_id: number
  size_id: number
  color_id: number
  name: string
  price: number
  is_featured: boolean
  is_archived: boolean
  images: string[]

  category: {
    id: number
    shop_slug: string
    created_at: string
    updated_at: string
    name: string
    billboard_id: number
  }
  size: {
    id: number
    shop_slug: string
    created_at: string
    updated_at: string
    name: string
    value: string
  }
  color: {
    id: number
    shop_slug: string
    created_at: string
    updated_at: string
    name: string
    value: string
  }
}

const getProducts = async (query: Query): Promise<ProductRecord[] | undefined> => {
  //   const type = query.type || "retail"
  const categoryId = query.categoryId || undefined
  const colorId = query.colorId || undefined
  const sizeId = query.sizeId || undefined
  const isFeatured = query.isFeatured || undefined

  try {
    const supabase = getServerClient()
    const { data: user } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Unauthenticated - 401")
    }

    const query = supabase
      .from("retail_product")
      .select(
        `*,
        category: categories (*),
        size: sizes (*),
        color: colors (*)`
      )
      .eq("shop_slug", shopSiteConfig.slug)

    if (categoryId) query.eq("category_id", categoryId)
    if (colorId) query.eq("color_id", colorId)
    if (sizeId) query.eq("size_id", sizeId)
    if (isFeatured) query.eq("is_featured", isFeatured)

    const { data: records, error } = await query

    if (error) throw error

    if (!records) {
      throw new Error("Products not found")
    }

    return records as ProductRecord[]
  } catch (error) {
    console.error(`[PRODUCTS_GET_ACTION]`, error)
    return undefined
  }
}

export default getProducts
