import Link from "next/link"
import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/Buttonn"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Cardd"
import { Text } from "@/components/ui/Text"
import { Icons } from "@/components/Iconss"
import { AuthModalFormSignIn } from "@/components/auth/AuthModalForm"

const Page = async () => {
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()

  if (data.user) {
    redirect("/")
  }

  return (
    <Card className="mt-4">
      <CardHeader className="p-4">
        <CardTitle>
          <Icons.Logo className="mx-auto h-8 w-8 mb-3" />
          <Text type="h3" className="text-center">
            Sign In
          </Text>
        </CardTitle>
      </CardHeader>

      <CardContent className="min-w-[400px] p-2">
        <AuthModalFormSignIn />
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center flex-col space-y-1">
          <Link
            href="/forgot"
            className={buttonVariants({
              variant: "link",
              size: "xs",
              className: "p-0 text-slate-200 hover:text-blue-300",
            })}
          >
            Forgot password?
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({
              variant: "link",
              size: "xs",
              className: "p-0 text-slate-200 hover:text-blue-300",
            })}
          >
            Not a member? Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Page
