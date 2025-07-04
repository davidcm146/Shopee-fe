"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { getProductById } from "@/data/product"
import type { CartItem } from "@/types/cart"
import type { Voucher } from "@/types/voucher"
import { calculateVoucherDiscount } from "@/data/voucher"

interface CheckoutOrderSummaryProps {
  items: CartItem[]
  appliedVouchers?: Voucher[]
}

export function CheckoutOrderSummary({ items, appliedVouchers = [] }: CheckoutOrderSummaryProps) {
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)

  // Calculate shipping - free if any free shipping voucher is applied
  const hasFreeShipping = appliedVouchers.some((voucher) => voucher.type === "free_shipping")
  const shipping = hasFreeShipping ? 0 : 5.99

  // Calculate total discount from all vouchers
  const totalVoucherDiscount = appliedVouchers.reduce((total, voucher) => {
    if (voucher.type === "free_shipping") return total // Free shipping doesn't add to monetary discount
    return total + calculateVoucherDiscount(voucher, subtotal)
  }, 0)

  const finalTotal = subtotal + shipping - totalVoucherDiscount

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Order Summary
          <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Items */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Selected Items:</h4>
          {items.map((item) => {
            const product = getProductById(item.productId)
            return (
              <div
                key={item.productId}
                className="flex justify-between items-start p-3 bg-orange-50 rounded-lg border border-orange-100"
              >
                <div className="flex gap-3 flex-1">
                  <img
                    src={product?.images?.[0] || "/placeholder.svg?height=50&width=50"}
                    alt={product?.name || "Product"}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product?.name || `Product ${item.productId}`}</h4>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium text-orange-600">${(item.unitPrice * item.quantity).toFixed(2)}</span>
              </div>
            )
          })}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
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
                  voucher.type === "free_shipping" ? 0 : calculateVoucherDiscount(voucher, subtotal)

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

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-orange-500">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
