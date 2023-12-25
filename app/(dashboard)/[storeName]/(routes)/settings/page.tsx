import type { FC } from "react"
import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"
import { SettingsForm } from "@/components/SettingsForm"

interface PageProps {
  params: { storeName: string }
}

const Page: FC<PageProps> = async ({ params }) => {
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()
  const { storeName } = params

  if (!data.user) {
    redirect("/sign-in")
  }

  const { data: shop } = await sb
    .from("shops")
    .select()
    .eq("name", storeName)
    .eq("userId", data.user.id)
    .single()

  if (!shop) {
    redirect("/")
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <SettingsForm initialData={shop} />
      </div>
    </div>
  )
}

export default Page
