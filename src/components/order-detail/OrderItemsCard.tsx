import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { Order } from "../../types/order"
import { getProductById } from "@/data/product"

interface OrderItemsCardProps {
  order: Order
}

export function OrderItemsCard({ order }: OrderItemsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order.items.map((item) => {
            const product = getProductById(item.productId)
            return (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <img
                  src={product?.images[0] || "/placeholder.svg"}
                  alt={product?.name || "Product"}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{product?.name || `Product ${item.productId}`}</h4>
                  {item.selectedVariant && (
                    <p className="text-sm text-muted-foreground">Variant: {item.selectedVariant}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                    <span className="font-medium">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
