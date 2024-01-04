"use client"

import type { FC } from "react"
import Image from "next/image"
import { Tab } from "@headlessui/react"

import { GalleryTab } from "./GalleryTab"

interface GalleryProps {
  images: string[]
}

const Gallery: FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image, index) => (
            <GalleryTab key={`image-${index}`} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel
            key={image}
            className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden"
          >
            <Image fill alt="Image" src={image} className="object-cover object-center" />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export { Gallery }
