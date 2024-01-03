import type { FC } from "react"
import Image from "next/image"
import { type BillboardRecord } from "@/actions/billboard"

interface BillboardProps {
  data: BillboardRecord
}

const Billboard: FC<BillboardProps> = ({ data }) => {
  const rowSpan = `row-span-${data.images.length}`

  return (
    <div className="flex justify-center">
      <div className="max-w-[1200px] w-full p-4 sm:px-6 lg:px-8 rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {/* Centerpiece Image */}
          <div className={`md:col-span-3 md:${rowSpan} rounded-xl overflow-hidden relative`}>
            <Image
              src={data.image_url}
              alt={data.label}
              fill
              className="border rounded-xl object-cover"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="text-center font-semibold text-xl sm:text-2xl lg:text-6xl text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)] underline underline-offset-[13px]">
                {data.label}
              </div>
            </div>
          </div>

          {/* Smaller Grid Items */}
          {data.images.map((item, index) => (
            <div
              key={index}
              className="md:col-start-4 rounded-xl overflow-hidden relative aspect-square"
            >
              <Image src={item.image.url} alt="" fill className="border rounded-xl object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Billboard }
