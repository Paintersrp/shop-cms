"use client"

import { useState, type FC } from "react"
import { useParams, useRouter } from "next/navigation"

import { Tables } from "@/types/supabase"
import { cn } from "@/lib/utils"
import { useShopModal } from "@/hooks/useShopModal"
import { Button } from "@/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { Icons } from "@/components/Icons"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ShopSwitcherProps extends PopoverTriggerProps {
  items?: Tables<"shops">[]
}

const ShopSwitcher: FC<ShopSwitcherProps> = ({ className, items = [] }) => {
  const [open, setOpen] = useState<boolean>(false)
  const shopModal = useShopModal()
  const params = useParams()
  const router = useRouter()

  const formattedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
  }))

  const currentShop = formattedItems.find((item) => item.name === params.storeName)

  const onShopSelect = (shop: { id: number; name: string }) => {
    setOpen(false)
    router.push(`/${shop.name}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <Icons.Shop className="mr-2 h-4 w-4" />
          {currentShop?.name ?? "Shop Name"}
          <Icons.ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search shop..."></CommandInput>
            <CommandEmpty>No shop found.</CommandEmpty>
            <CommandGroup heading="Shops">
              {formattedItems.map((shop) => (
                <CommandItem className="" key={shop.id} onSelect={() => onShopSelect(shop)}>
                  <Icons.Shop className="mr-2 h-4 w-4" />
                  {shop.name}
                  <Icons.Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentShop?.name === shop.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  shopModal.onOpen()
                }}
              >
                <Icons.PlusCircle className="mr-2 h-5 w-5" />
                Create Shop
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { ShopSwitcher }
