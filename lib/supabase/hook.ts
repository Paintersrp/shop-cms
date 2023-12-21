import { cookies } from "next/headers"

import { createClient } from "./server"

export const getServerClient = () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  return supabase
}
