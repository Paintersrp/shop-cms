"use client"

import type { FC } from "react"
import Link from "next/link"

import { adminSiteConfig } from "@/config/admin"
import { buttonVariants } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { TooltipWrapper } from "@/components/ui/Tooltip"

const AdminFooter: FC = () => {
  return (
    <footer className="bg-background bottom-0 z-40 w-full border-t dark:border-slate-700 border-slate-300 mt-8">
      <div className="px-4 sm:px-2 sm:container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Copyright Section */}
        <div className="flex space-x-2 items-center">
          <Icons.Copyright className="h-6 sm:h-6 w-6 sm:w-6" />
          <div className="flex flex-col">
            <p className="dark:text-white text-black dark:font-bold font-medium text-sm">
              2023 - Shop CMS
            </p>
            <p className="dark:text-white text-black dark:font-bold font-medium text-sm">
              Ryan Painter
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1.5">
            {/* Github Button and Link */}
            <TooltipWrapper content="View code on Github">
              <Link href={adminSiteConfig.links.github} target="_blank" rel="noreferrer">
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.GitHub className="h-6 sm:h-6 w-6 sm:w-6" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
            </TooltipWrapper>

            {/* Portfolio Icon and Link */}
            <TooltipWrapper content="Contact Me">
              <Link href={adminSiteConfig.links.email} target="_blank" rel="noreferrer">
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.Contact className="h-6 sm:h-6 w-6 sm:w-6" />
                  <span className="sr-only">Email contact</span>
                </div>
              </Link>
            </TooltipWrapper>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { AdminFooter }
