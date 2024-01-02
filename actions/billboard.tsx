import { Tables } from "@/types/supabase"

const URL = `http://localhost:3000/api/quiet-creek-spa/billboards`

const getBillboard = async (id: string): Promise<Tables<"billboards">> => {
  const res = await fetch(`${URL}/${id}`)

  return res.json()
}

export default getBillboard
