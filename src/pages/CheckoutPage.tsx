import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader"
import type { CheckoutData } from "@/types/order"
import { CheckoutOrderSummary } from "@/components/checkout/OrderSummary"
import { VoucherSelection } from "@/components/checkout/VoucherSelection"
import { useCart } from "@/context/CartContext"
import type { CartItem } from "@/types/cart"
import type { Voucher } from "@/types/voucher"
import { createOrder } from "@/data/order"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"

export function CheckoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { state } = useCart()

  const [selectedItems, setSelectedItems] = useState<CartItem[] | null>(null)
  const [appliedVouchers, setAppliedVouchers] = useState<Voucher[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const selectedItemIds = searchParams.get("selectedItems")?.split(",") ?? []

    if (selectedItemIds.length === 0 || !state.cart?.items) {
      console.warn("No valid selected item IDs or empty cart")
      setSelectedItems([])
      setIsLoading(false)
      return
    }

    const matchedItems = state.cart.items.filter((item) =>
      selectedItemIds.includes(item.productId)
    )

    setSelectedItems(matchedItems)
    setIsLoading(false)
  }, [searchParams, state.cart?.items])

  // Redirect to /cart if no selected items
  useEffect(() => {
    if (!isLoading && selectedItems?.length === 0) {
      navigate("/cart")
    }
  }, [isLoading, selectedItems, navigate])

  const subtotal = selectedItems?.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  ) ?? 0

  const handleVouchersApply = (vouchers: Voucher[]) => {
    setAppliedVouchers(vouchers)
  }

  const handleCheckoutSubmit = async (checkoutData: CheckoutData) => {
    setIsLoading(true)
    try {
      const hasFreeShipping = appliedVouchers.some(
        (voucher) => voucher.type === "free_shipping"
      )
      const shipping = hasFreeShipping ? 0 : 5.99

      const orderData = await createOrder({
        buyerId: "buyer_123",
        deliveryAddress: checkoutData.deliveryAddress,
        subtotal,
        shipping,
        vouchers: appliedVouchers,
        items: selectedItems!.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          createdAt: item.createdAt,
        })),
        paymentId: checkoutData.paymentMethod,
      })

      navigate(`/order-confirmation/${orderData.id}`);
    } catch (error) {
      console.error("Checkout failed:", error)
      alert("Checkout failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || selectedItems === null) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <p>Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-8">
      <CheckoutHeader selectedItemsCount={selectedItems.length} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <VoucherSelection
            orderAmount={subtotal}
            onVouchersApply={handleVouchersApply}
            appliedVouchers={appliedVouchers}
          />
          <CheckoutForm onSubmit={handleCheckoutSubmit} isLoading={isLoading} />
        </div>

        <div>
          <CheckoutOrderSummary
            items={selectedItems}
            appliedVouchers={appliedVouchers}
          />
        </div>
      </div>
    </div>
  )
}
