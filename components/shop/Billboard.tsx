"use client"

import { useRef, type FC } from "react"
import Image from "next/image"
import { type BillboardRecord } from "@/actions/billboard"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"

interface BillboardProps {
  data: BillboardRecord
}

const Billboard: FC<BillboardProps> = ({ data }) => {
  const plugin = useRef(Autoplay({ delay: 15000, stopOnInteraction: true }))

  return (
    <Carousel
      animate={{ type: "scale", factor: 0.5 }}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => {
        plugin.current.play()
      }}
    >
      <CarouselContent>
        <CarouselItem key="centerpiece" index={0}>
          <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
              <Image
                src={data.image_url}
                alt={data.label}
                fill
                className="border rounded-xl object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="text-center font-bold text-3xl sm:text-5xl lg:text-6xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                  {data.label}
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
        {data.images.map((item, index) => (
          <CarouselItem key={item.image.id} index={index + 1}>
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
              <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
                <Image
                  src={item.image.url}
                  alt={item.alt}
                  fill
                  className="border rounded-xl object-cover"
                />
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="text-center font-bold text-3xl sm:text-5xl lg:text-6xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] ">
                    {item.caption}
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
      <CarouselDots />
    </Carousel>
  )
}

export { Billboard }
