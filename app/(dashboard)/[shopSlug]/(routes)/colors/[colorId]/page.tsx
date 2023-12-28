import { getServerClient } from "@/lib/supabase/hook"

import { ColorForm } from "../components/ColorForm"

interface ColorPageProps {
  params: {
    colorId: string
    shopSlug: string
  }
}

const ColorPage = async ({ params }: ColorPageProps) => {
  const sb = getServerClient()

  const { colorId } = params

  const { data: color } = await sb.from("colors").select().eq("id", colorId).single()

  // todo if billboard not found display ?

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorPage
