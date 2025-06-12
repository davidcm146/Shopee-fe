import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { Order } from "../../types/order"
import { getProductById } from "@/data/product"

interface OrderDetailsCardProps {
  order: Order
}

export function OrderDetailsCard({ order }: OrderDetailsCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-medium">{order.orderId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Order Date</p>
            <p className="font-medium">{order.createdAt.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium capitalize">{order.status}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="font-medium text-orange-500">${order.totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Delivery Address</p>
          <p className="font-medium">{order.deliveryAddress}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Items Ordered</p>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  { getProductById(item.productId)?.name } x {item.quantity}
                </span>
                <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Shipping</span>
            <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>

          {/* Voucher Discount */}
          {order.voucherDiscount && order.voucherDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span className="text-sm">Voucher Discount {order.voucherCode && `(${order.voucherCode})`}</span>
              <span>-${order.voucherDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-orange-500">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
