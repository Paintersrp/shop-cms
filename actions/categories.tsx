import { Tables } from "@/types/supabase"

const URL = `http://localhost:3000/api/quiet-creek-spa/categories`

const getCategories = async (): Promise<Tables<"categories">[]> => {
  const res = await fetch(URL)

  return res.json()
}

export default getCategories
