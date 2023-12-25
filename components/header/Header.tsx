import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"
import { ThemeToggle } from "@/components/header/ThemeToggle"

import { NavLinks } from "./NavLinks"
import { UserDropdownMenu } from "./UserDropdown"

const Header = async () => {
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()

  if (!data.user) redirect("/sign-in")

  const { data: shops } = await sb.from("shops").select().eq("userId", data.user.id)

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="px-4 sm:px-2 sm:container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavLinks shops={shops ? shops : []} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1.5">
            <ThemeToggle />
            <UserDropdownMenu />
          </nav>
        </div>
      </div>
    </header>
  )
}

export { Header }
