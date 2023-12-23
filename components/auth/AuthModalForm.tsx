"use client"

import { useAuthModal } from "@/hooks/useAuthModal"

import { Button } from "../ui/Button"
import { AuthModalFormForgot } from "./AuthModalFormForgot"
import { AuthModalFormSignIn } from "./AuthModalFormSignIn"
import { AuthModalFormSignUp } from "./AuthModalFormSignUp"

const AuthModalForm = () => {
  const { view, setView } = useAuthModal()

  return (
    <div className="space-y-1 -mt-2">
      {view === "sign-in" && <AuthModalFormSignIn />}
      {view === "sign-up" && <AuthModalFormSignUp />}
      {view === "forgot" && <AuthModalFormForgot />}

      <div className="flex justify-center flex-col space-y-1">
        {view === "sign-in" && (
          <Button
            size="xs"
            variant="link"
            className="p-0 text-slate-200"
            onClick={() => setView("forgot")}
          >
            Forgot Password?
          </Button>
        )}

        {view === "sign-in" && (
          <Button
            size="xs"
            variant="link"
            className="p-0 text-slate-200"
            onClick={() => setView("sign-up")}
          >
            Not a member? Sign Up
          </Button>
        )}

        {view === "sign-up" && (
          <Button
            size="xs"
            variant="link"
            className="p-0 text-slate-200"
            onClick={() => setView("sign-in")}
          >
            Already a Member?
          </Button>
        )}

        {view === "forgot" && (
          <Button
            size="xs"
            variant="link"
            className="p-0 text-slate-200"
            onClick={() => setView("sign-in")}
          >
            Return to Sign In
          </Button>
        )}
      </div>
    </div>
  )
}

export { AuthModalForm }
