import { getServerClient } from "@/lib/supabase/hook"

import { SizeForm } from "../components/SizeForm"

interface SizePageProps {
  params: {
    sizeId: string
    shopSlug: string
  }
}

const SizePage = async ({ params }: SizePageProps) => {
  const sb = getServerClient()

  const { sizeId } = params

  const { data: size } = await sb.from("sizes").select().eq("id", sizeId).single()

  // todo if billboard not found display ?

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <SizeForm initialData={size!} />
      </div>
    </div>
  )
}

export default SizePage
