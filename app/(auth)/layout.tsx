interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="sm:container">
      <div className="flex flex-col items-center justify-center min-h-[90vh]">{children}</div>
    </div>
  )
}
