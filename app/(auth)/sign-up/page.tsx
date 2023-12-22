import AuthForm from "@/components/new/AuthForm"

export default function SignUp() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <AuthForm view="sign_up" />
    </div>
  )
}
