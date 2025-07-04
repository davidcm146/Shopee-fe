"use client"

import { useCart } from "@/context/CartContext"
import { CartHeader } from "@/components/cart/CartHeader"
import { CartItemsList } from "@/components/cart/CartList"
import { OrderSummary } from "@/components/cart/OrderSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"

export function CartPage() {
  const { state } = useCart()

  // If cart is loading, show loading state
  if (state.isLoading) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <p>Loading cart...</p>
        </div>
      </div>
    )
  }

  // If no cart or empty cart, show empty state
  if (!state.cart?.items || state.cart.items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container py-6 px-8">
      <CartHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        <CartItemsList />
        <OrderSummary />
      </div>
    </div>
  )
}
