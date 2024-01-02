import type { FC } from "react"

interface ShopFooterProps {
  // Add your prop types here
}

const ShopFooter: FC<ShopFooterProps> = ({}) => {
  return (
    <footer className="border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs">&copy; 2023 Quiet Creek Spa</p>
      </div>
    </footer>
  )
}

export { ShopFooter }
