"use client"

import { useEffect, useState } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared"
import { useTheme } from "next-themes"

import { createClient } from "@/lib/supabase/client"
import { Text } from "@/components/ui/Text"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/Icons"

interface AuthFormProps {
  view: ViewType
  title?: string
}

export default function AuthForm({ view, title = "Welcome" }: AuthFormProps) {
  const supabase = createClient()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // AuthForm Skeleton
  if (!mounted) {
    return null
  }

  return (
    <Card className="mt-4">
      <CardHeader className="py-4 px-6">
        <CardTitle>
          <Icons.logo className="mx-auto h-8 w-8 mb-3" />
          <Text type="h3" className="text-center">
            {title}
          </Text>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 py-4 px-6 pt-0">
        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{ theme: ThemeSupa }}
          theme={theme}
          showLinks={true}
          providers={["google", "apple", "facebook"]}
          redirectTo="http://localhost:3000/auth/callback"
          socialLayout="horizontal"
        />
      </CardContent>
    </Card>
  )
}
