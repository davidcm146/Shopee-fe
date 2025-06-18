import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { CartItem } from "../../types/cart"
import type { Voucher } from "../../types/voucher"
import { getProductById } from "@/data/product"
import { calculateVoucherDiscount } from "../../data/voucher"

interface CheckoutOrderSummaryProps {
  items: CartItem[]
  totalAmount: number
  appliedVouchers?: Voucher[]
}

export function CheckoutOrderSummary({ items, totalAmount, appliedVouchers = [] }: CheckoutOrderSummaryProps) {
  // Calculate shipping - free if any free shipping voucher is applied
  const hasFreeShipping = appliedVouchers.some((voucher) => voucher.type === "free_shipping")
  const shipping = hasFreeShipping ? 0 : 5.99

  // Calculate total discount from all vouchers
  const totalVoucherDiscount = appliedVouchers.reduce((total, voucher) => {
    if (voucher.type === "free_shipping") return total // Free shipping doesn't add to monetary discount
    return total + calculateVoucherDiscount(voucher, totalAmount)
  }, 0)

  const finalTotal = totalAmount + shipping - totalVoucherDiscount

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{getProductById(item.productId)?.name}</h4>
                {item.selectedVariant && (
                  <p className="text-xs text-muted-foreground">Variant: {item.selectedVariant}</p>
                )}
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="font-medium">${(item.unitPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className={shipping === 0 ? "text-green-600" : ""}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          {/* Voucher Discounts */}
          {appliedVouchers.length > 0 && (
            <div className="space-y-1">
              {appliedVouchers.map((voucher) => {
                const discountAmount =
                  voucher.type === "free_shipping" ? 0 : calculateVoucherDiscount(voucher, totalAmount)

                return (
                  <div key={voucher.id} className="flex justify-between text-green-600 text-sm">
                    <span>{voucher.title}</span>
                    <span>{voucher.type === "free_shipping" ? "Free Shipping" : `-$${discountAmount.toFixed(2)}`}</span>
                  </div>
                )
              })}

              {totalVoucherDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-medium border-t border-green-200 pt-1">
                  <span>Total Voucher Savings</span>
                  <span>-${totalVoucherDiscount.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-500">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
