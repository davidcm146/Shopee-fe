import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { CartItem } from "../../types/cart"
import type { AppliedVoucher } from "../../types/voucher"

interface CheckoutOrderSummaryProps {
  items: CartItem[]
  totalAmount: number
  appliedVoucher?: AppliedVoucher | null
}

export function CheckoutOrderSummary({ items, totalAmount, appliedVoucher }: CheckoutOrderSummaryProps) {
  const tax = totalAmount * 0.08
  const shipping = appliedVoucher?.voucher.type === "free_shipping" ? 0 : 5.99
  const voucherDiscount = appliedVoucher?.discountAmount || 0
  const finalTotal = totalAmount + tax + shipping - voucherDiscount

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.product?.name}</h4>
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
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          {/* Voucher Discount */}
          {appliedVoucher && voucherDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Voucher Discount ({appliedVoucher.voucher.title})</span>
              <span>-${voucherDiscount.toFixed(2)}</span>
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
