import { useCart } from "../context/CartContext"
import { CartHeader } from "../components/cart/CartHeader"
import { EmptyCart } from "../components/cart/EmptyCart"
import { CartItemsList } from "../components/cart/CartList"
import { OrderSummary } from "../components/cart/OrderSummary"

export function CartPage() {
  const { state, clearCart, getTotalItems } = useCart()
  const totalItems = getTotalItems()

  if (!state.cart || state.cart.items.length === 0) {
    return <EmptyCart />
  }

  const totalAmount = state.cart.totalAmount || 0

  return (
    <div className="container py-6 px-8">
      <CartHeader totalItems={totalItems} onClearCart={clearCart} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CartItemsList items={state.cart.items} />
        <OrderSummary totalItems={totalItems} totalAmount={totalAmount} />
      </div>
    </div>
  )
}
