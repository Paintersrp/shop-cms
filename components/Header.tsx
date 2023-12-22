import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/Button"
import { Icons } from "@/components/Icons"
import { Nav } from "@/components/Nav"
import { ThemeToggle } from "@/components/ThemeToggle"

import { MenuIcon } from "./MenuIcon"
import { TooltipWrapper } from "./ui/Tooltip"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Nav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* Contact / Email Button */}
            <TooltipWrapper content="Contact Me">
              <Link href={siteConfig.links.email} target="_blank" rel="noreferrer">
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.contact className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </div>
              </Link>
            </TooltipWrapper>

            {/* Github Link to Code */}
            <TooltipWrapper content="View code on Github">
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
            </TooltipWrapper>

            <ThemeToggle />

            <TooltipWrapper content="View code on Github">
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.user className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
            </TooltipWrapper>
          </nav>
        </div>
      </div>
    </header>
  )
}
