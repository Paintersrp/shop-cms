import type { FC } from "react"

import { shopSiteConfig } from "@/config/shop"

const ShopFooter: FC = () => {
  return (
    <footer className="bg-background bottom-0 z-40 w-full border-t dark:border-slate-700 border-slate-300 mt-8">
      <div className="mx-auto px-4 sm:px-2 sm:container flex h-16 items-center space-x-4 sm:justify-between w-full sm:space-x-0">
        <div className="flex space-x-2 justify-center items-center w-full">
          <p className="text-sm">&copy; {shopSiteConfig.name}</p>
        </div>
      </div>
    </footer>
  )
}

export { ShopFooter }
