"use client"

import { FC } from "react"

import { useAuth } from "@/hooks/auth/useAuth"
import { useAuthModal, type View } from "@/hooks/auth/useAuthModal"
import { Button } from "@/components/ui/Button"

import { AuthForm } from "./AuthForm"
import { ForgotForm } from "./ForgotForm"

/**
 * Sign In Component
 */
const AuthModalFormSignIn: FC = () => {
  const { form, signIn, isLoading } = useAuth()

  return (
    <AuthForm
      onSubmit={form.handleSubmit(signIn)}
      form={form}
      buttonText="Sign In"
      isLoading={isLoading}
    />
  )
}

/**
 * Sign Up Component
 */
const AuthModalFormSignUp: FC = () => {
  const { form, signUp, isLoading } = useAuth()

  return (
    <AuthForm
      onSubmit={form.handleSubmit(signUp)}
      form={form}
      buttonText="Sign Up"
      isLoading={isLoading}
    />
  )
}

/**
 * Forgot Password Component
 */
const AuthModalFormForgot: FC = () => {
  const { forgotForm, forgotPassword, isLoading } = useAuth()

  return (
    <ForgotForm
      onSubmit={forgotForm.handleSubmit(forgotPassword)}
      form={forgotForm}
      buttonText="Send reset link"
      isLoading={isLoading}
    />
  )
}

interface ViewObjects {
  [key: string]: {
    component: FC
    links: {
      label: string
      view: View
    }[]
  }
}

/**
 * Object of different views available within the AuthModal and available view links
 */
const views: ViewObjects = {
  "sign-in": {
    component: AuthModalFormSignIn,
    links: [
      {
        label: "Forgot Password?",
        view: "forgot",
      },
      {
        label: "Not a member? Sign Up",
        view: "sign-up",
      },
    ],
  },
  "sign-up": {
    component: AuthModalFormSignUp,
    links: [
      {
        label: "Already a Member?",
        view: "sign-in",
      },
    ],
  },
  forgot: {
    component: AuthModalFormForgot,
    links: [
      {
        label: "Return to Sign In",
        view: "sign-in",
      },
    ],
  },
}

/**
 * Sets up the view component to be displayed in the modal. Views are changed via links at the
 * bottom of a given view component
 */
const AuthModalForm: FC = () => {
  // Retrieve getter and setter for view from hook
  const { view, setView } = useAuthModal()

  // Determine the current view based on the getter and the available view objects
  const currentView = views[view]

  // Handles changing the view by first checking if the selected view exists
  const switchView = (view: View) => {
    if (views[view]) {
      setView(view)
    }
  }

  // Sets up the view component, if we have one
  const ViewComponent = currentView ? currentView.component : null

  return (
    <div className="space-y-1 -mt-2">
      {ViewComponent && <ViewComponent />}

      <div className="flex justify-center flex-col space-y-1">
        {currentView &&
          currentView.links.map((link, index) => (
            <Button
              key={`view-link-${index}`}
              size="xs"
              variant="link"
              className="p-0 text-slate-200 hover:text-blue-300"
              onClick={() => switchView(link.view)}
            >
              {link.label}
            </Button>
          ))}
      </div>
    </div>
  )
}

export { AuthModalForm, AuthModalFormSignIn, AuthModalFormSignUp, AuthModalFormForgot }
