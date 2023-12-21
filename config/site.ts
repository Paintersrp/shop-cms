export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Admin Dashboard",
  description: "Built with NextJS, React, Radix UI, and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Sign In",
      href: "/sign-in",
    },
    {
      title: "Sign Up",
      href: "/sign-up",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
