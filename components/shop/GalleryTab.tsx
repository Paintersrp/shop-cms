import type { FC } from "react"
import Image from "next/image"
import { Tab } from "@headlessui/react"

import { cn } from "@/lib/utils"

interface GalleryTabProps {
  image: string
}

const GalleryTab: FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <Image fill alt="Image" src={image} className="object-cover object-center" />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  )
}

export { GalleryTab }
