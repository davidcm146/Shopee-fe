import { CartItem } from "./CartItem"
import type { CartItem as CartItemType } from "../../types/cart"

interface CartItemsListProps {
  items: CartItemType[]
}

export function CartItemsList({ items }: CartItemsListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {items.map((item) => (
        <CartItem key={item.cartItemId} item={item} />
      ))}
    </div>
  )
}
