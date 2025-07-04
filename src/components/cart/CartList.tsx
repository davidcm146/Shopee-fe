"use client"

import { CartItem } from "./CartItem"
import { useCart } from "@/context/CartContext"

export function CartItemsList() {
  const { state } = useCart()

  if (!state.cart?.items) {
    return null
  }

  return (
    <div className="lg:col-span-2 space-y-4">
      {state.cart.items.map((item) => (
        <CartItem key={item.productId} item={item} />
      ))}
    </div>
  )
}
