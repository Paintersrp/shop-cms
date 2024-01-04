import { shopSiteConfig } from "@/config/shop"
import { getServerClient } from "@/lib/supabase/hook"

import { ProductRecord } from "./products"

const getProduct = async (id: number): Promise<ProductRecord | undefined> => {
  try {
    const supabase = getServerClient()
    const { data: user } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Unauthenticated - 401")
    }

    const { data: record, error } = await supabase
      .from("retail_product")
      .select(
        `*,
        category: categories (*),
        size: sizes (*),
        color: colors (*)`
      )
      .eq("shop_slug", shopSiteConfig.slug)
      .eq("id", id)
      .single()

    if (error) throw error

    if (!record) {
      throw new Error("Products not found")
    }

    return record as ProductRecord
  } catch (error) {
    console.error(`[PRODUCT_GET_ACTION]`, error)
    return undefined
  }
}

export default getProduct
