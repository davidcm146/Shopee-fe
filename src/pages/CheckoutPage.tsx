"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckoutHeader } from "../components/checkout/CheckoutHeader"
import { CheckoutForm } from "../components/checkout/CheckoutForm"
import { CheckoutOrderSummary } from "../components/checkout/OrderSummary"
import { VoucherSelection } from "../components/checkout/VoucherSelection"
import { useCart } from "../context/CartContext"
import { createOrder } from "../data/order"
import { calculateVoucherDiscount } from "../data/voucher"
import type { CheckoutData } from "../types/order"
import type { Voucher } from "../types/voucher"

export function CheckoutPage() {
  const navigate = useNavigate()
  const { state: cartState, clearCart } = useCart()
  const [appliedVouchers, setAppliedVouchers] = useState<Voucher[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if cart is empty (but not during processing)
  if (!cartState.cart || (cartState.cart.items.length === 0 && !isProcessing)) {
    navigate("/cart")
    return null
  }

  const handleVouchersApply = (vouchers: Voucher[]) => {
    setAppliedVouchers(vouchers)
  }

  const handleCheckout = async (checkoutData: CheckoutData) => {
    try {
      setIsProcessing(true)

      const subtotal = cartState.cart!.totalAmount

      const hasFreeShipping = appliedVouchers.some((voucher) => voucher.type === "free_shipping")
      const shipping = hasFreeShipping ? 0 : 5.99

      const totalVoucherDiscount = appliedVouchers.reduce((total, voucher) => {
        if (voucher.type === "free_shipping") return total
        return total + calculateVoucherDiscount(voucher, subtotal)
      }, 0)

      const orderData = {
        buyerId: cartState.cart!.userId,
        paymentId: `payment_${Date.now()}`,
        items: cartState.cart!.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          selectedVariant: item.selectedVariant,
        })),
        deliveryAddress: checkoutData.deliveryAddress,
        vouchers: appliedVouchers,
        subtotal,
        shipping,
        voucherDiscount: totalVoucherDiscount,
        total: subtotal + shipping - totalVoucherDiscount,
      }

      const order = await createOrder(orderData)

      // Nếu chọn PayPal thì redirect
      if (checkoutData.paymentMethod === "paypal") {
        window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${order.paymentId}`
        return
      }

      // Nếu là COD thì hiển thị thông báo và chuyển tới trang xác nhận đơn
      alert("Order placed with Cash on Delivery!")

      navigate(`/order-confirmation/${order.id}`)

      // Clear cart sau một chút để đảm bảo navigate thành công
      setTimeout(() => {
        clearCart()
        setIsProcessing(false)
      }, 100)

    } catch (error) {
      console.error("Checkout failed:", error)
      setIsProcessing(false)
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
            onVouchersApply={handleVouchersApply}
            appliedVouchers={appliedVouchers}
          />
          <CheckoutForm onSubmit={handleCheckout} isLoading={isProcessing} />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutOrderSummary
            items={cartState.cart.items}
            totalAmount={cartState.cart.totalAmount}
            appliedVouchers={appliedVouchers}
          />
        </div>
      </div>
    </div>
  )
}
