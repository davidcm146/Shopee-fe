import { CartItem } from "./CartItem"
import type { CartItem as CartItemType } from "../../types/cart"
import { useCart } from "@/context/CartContext"

interface CartItemsListProps {
  items: CartItemType[]
}

export function CartItemsList({ items }: CartItemsListProps) {
  const { removeFromCart, updateQuantity } = useCart()
  return (
    <div className="lg:col-span-2 space-y-4">
      {items.map((item) => (
        <CartItem 
        key={item.id} 
        item={item}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity} 
        />
      ))}
    </div>
  )
}
