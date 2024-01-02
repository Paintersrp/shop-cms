"use client"

import type { FC } from "react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

import { useMounted } from "@/hooks/useMounted"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const mounted = useMounted()

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!mounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="iconSm"
                onClick={() => onRemove(url)}
              >
                <Icons.Delete className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="vwixetzk">
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
              <Icons.ImagePlus className="h-4 w-4 mr-2" />
              Upload an image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export { ImageUpload }
