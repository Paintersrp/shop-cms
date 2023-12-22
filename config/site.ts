export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Shop CMS",
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
    email: "mailto:paintersrp@gmail.com",
    github: "https://github.com/Paintersrp/shop-cms",
  },
}
