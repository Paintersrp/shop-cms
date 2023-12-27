import { getServerClient } from "@/lib/supabase/hook"

import { BillboardForm } from "../components/BillboardForm"

interface BillboardPageProps {
  params: { billboardId: string }
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const sb = getServerClient()

  const { billboardId } = params

  const { data: billboard } = await sb.from("billboards").select().eq("id", billboardId).single()

  // todo if billboard not found display ?

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <BillboardForm initialData={billboard!} />
      </div>
    </div>
  )
}

export default BillboardPage
