import type { FC } from "react"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { getServerClient } from "@/lib/supabase/hook"
import { Button, buttonVariants } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Text } from "@/components/ui/Text"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/Icons"

const OldForm: FC = ({}) => {
  const signIn = async (formData: FormData) => {
    "use server"

    // TODO Validation
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    // TODO Validation

    const sb = getServerClient()

    const { error } = await sb.auth.signInWithPassword({
      email,
      password,
    })

    // TODO Better Error Handling
    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }

    return redirect("/")
  }

  const signUp = async (formData: FormData) => {
    "use server"

    const origin = headers().get("origin")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const sb = getServerClient()

    const { error } = await sb.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect("/sign-in?message=Could not authenticate user")
    }

    return redirect("/sign-in?message=Check email to continue sign in process")
  }

  return (
    <form action={signIn}>
      <Card className="mt-4">
        <CardHeader className="py-4 px-6">
          <CardTitle>
            <Icons.logo className="mx-auto h-8 w-8 mb-3" />
            <Text type="h3" className="text-center">
              Welcome back
            </Text>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 py-4 px-6 pt-0">
          <div>
            <Label className="text-md" htmlFor="email">
              Email
            </Label>
            <Input
              className="rounded-md px-4 py-2 bg-inherit border mt-1"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <Label className="text-md" htmlFor="password">
              Password
            </Label>
            <Input
              className="rounded-md px-4 py-2 bg-inherit border mt-1"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="gap-2 flex-col py-4 px-6 pt-0">
          <div className="flex w-full justify-between">
            <Button variant="outline" className="group">
              <Link
                href="/"
                className="rounded-md no-underline flex items-center justify-center group font-medium"
              >
                <ArrowLeft className="mr-2 h-[1.15rem] w-[1.15rem] transition-transform group-hover:-translate-x-1" />
                Back
              </Link>
            </Button>

            <Button variant="default">Sign In</Button>
          </div>
          <p className="text-sm">
            Not a member? {"  "}
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "link", size: "sm", className: "px-0" })}
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  )
}

export { OldForm }
