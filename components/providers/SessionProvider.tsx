"use client"

import { useEffect, type FC } from "react"
import type { User } from "@supabase/gotrue-js/src/lib/types"

import { useUserStore } from "@/lib/stores/user"

interface UserProviderProps {
  user: User | null
}

const UserProvider: FC<UserProviderProps> = ({ user }) => {
  const { setUser } = useUserStore()

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  return null
}

export { UserProvider }
