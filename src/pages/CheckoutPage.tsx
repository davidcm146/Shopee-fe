import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckoutHeader } from "../components/checkout/CheckoutHeader"
import { CheckoutForm } from "../components/checkout/CheckoutForm"
import { CheckoutOrderSummary } from "../components/checkout/OrderSummary"
import { VoucherSelection } from "../components/checkout/VoucherSelection"
import { useCart } from "../context/CartContext"
import { useOrder } from "../context/OrderContext"
import type { CheckoutData } from "../types/order"
import type { AppliedVoucher } from "../types/voucher"

export function CheckoutPage() {
  const navigate = useNavigate()
  const { state: cartState, clearCart } = useCart()
  const { createOrder } = useOrder()
  const [appliedVoucher, setAppliedVoucher] = useState<AppliedVoucher | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if cart is empty (but not during processing)
  if (!cartState.cart || (cartState.cart.items.length === 0 && !isProcessing)) {
    navigate("/cart")
    return null
  }

  const handleVoucherApply = (voucher: AppliedVoucher | null) => {
    setAppliedVoucher(voucher)
  }

  const handleCheckout = async (checkoutData: CheckoutData) => {
    try {
      setIsProcessing(true)

      const subtotal = cartState.cart!.totalAmount
      const tax = subtotal * 0.08
      const shipping = appliedVoucher?.voucher.type === "free_shipping" ? 0 : 5.99
      const voucherDiscount = appliedVoucher?.discountAmount || 0

      // Create order from cart items
      const orderData = {
        buyerId: cartState.cart!.userId,
        sellerId: "default-seller", // In a real app, this would be determined by the products
        items: cartState.cart!.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          selectedVariant: item.selectedVariant,
        })),
        deliveryAddress: checkoutData.deliveryAddress,
        paymentMethod: checkoutData.paymentMethod,
        // Add voucher information
        voucherId: appliedVoucher?.voucher.id,
        voucherDiscount: voucherDiscount,
        voucherCode: appliedVoucher?.voucher.title,
        // Add price breakdown
        subtotal,
        tax,
        shipping,
      }

      const order = await createOrder(orderData)

      // Navigate first, then clear cart after a small delay
      navigate(`/order-confirmation/${order.orderId}`)

      // Clear cart after navigation to prevent redirect
      setTimeout(() => {
        clearCart()
        setIsProcessing(false)
      }, 100)
    } catch (error) {
      console.error("Checkout failed:", error)
      setIsProcessing(false)
      // Handle error (show toast, etc.)
    }
  }

  return (
    <div className="container py-6 max-w-6xl mx-auto">
      <CheckoutHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          <VoucherSelection
            orderAmount={cartState.cart.totalAmount}
            onVoucherApply={handleVoucherApply}
            appliedVoucher={appliedVoucher}
          />
          <CheckoutForm onSubmit={handleCheckout} isLoading={isProcessing} />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutOrderSummary
            items={cartState.cart.items}
            totalAmount={cartState.cart.totalAmount}
            appliedVoucher={appliedVoucher}
          />
        </div>
      </div>
    </div>
  )
}

