import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faDownload, faTimes, faTag, faTruck } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { cancelOrderItem } from "../../data/order"
import type { Order, OrderItemStatus } from "../../types/order"
import { getProductById } from "../../data/product"
import { formatDate } from "@/lib/dateTime.utils"

interface OrderItemProps {
  order: Order
  onOrderUpdate?: () => void
}

export function OrderItem({ order, onOrderUpdate }: OrderItemProps) {
  const [cancellingItems, setCancellingItems] = useState<Set<number>>(new Set())

  const getStatusColor = (status: OrderItemStatus) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "shipping":
        return "bg-blue-500"
      case "packed":
        return "bg-purple-500"
      case "confirmed":
        return "bg-indigo-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const canCancelItem = (status: OrderItemStatus) => {
    return status === "pending" || status === "confirmed"
  }

  const handleCancelOrderItem = async (itemIndex: number) => {
    if (window.confirm("Are you sure you want to cancel this item?")) {
      setCancellingItems((prev) => new Set(prev).add(itemIndex))
      try {
        await cancelOrderItem(order.id, itemIndex)
        onOrderUpdate?.()
        // Refresh the page to show updated status
        window.location.reload()
      } catch (error) {
        console.error("Failed to cancel order item:", error)
      } finally {
        setCancellingItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(itemIndex)
          return newSet
        })
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Vouchers display */}
        {order.vouchers && order.vouchers.length > 0 && (
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-1 mb-2">
              <FontAwesomeIcon icon={faTag} className="h-3 w-3 text-green-600" />
              <span className="text-sm font-medium text-green-600">Vouchers Applied:</span>
            </div>
            <div className="space-y-1">
              {order.vouchers.map((voucher) => (
                <div key={voucher.id} className="text-sm text-green-600">
                  • {voucher.title} - {voucher.description}
                  {voucher.type === "percentage" && ` (${voucher.discount}% off)`}
                  {voucher.type === "fixed_amount" && ` ($${voucher.discount} off)`}
                  {voucher.type === "free_shipping" && " (Free shipping)"}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Items ({order.items.length}):</h4>
          {order.items.map((item, index) => {
            const product = getProductById(item.productId)
            const isItemCancelling = cancellingItems.has(index)

            return (
              <div key={index} className="bg-gray-50 p-3 rounded border">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h5 className="font-medium">{product?.name || `Product ${item.productId}`}</h5>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} × ${item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                    <Badge className={`${getStatusColor(item.statusHistory[item.statusHistory.length - 1].status)} text-white text-xs`}>
                      {item.statusHistory[item.statusHistory.length - 1].status.charAt(0).toUpperCase() + item.statusHistory[item.statusHistory.length - 1].status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Item Actions */}
                <div className="mt-2 pt-2">
                  <div className="flex gap-2">
                    {canCancelItem(item.statusHistory[item.statusHistory.length - 1].status) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelOrderItem(index)}
                        disabled={isItemCancelling}
                        className="text-red-600 hover:text-red-700 text-xs"
                      >
                        <FontAwesomeIcon icon={faTimes} className="h-3 w-3 mr-1" />
                        {isItemCancelling ? "Cancelling..." : "Cancel Item"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Separator />

        {/* Delivery Address */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Delivery Address:</p>
          <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
        </div>

        {/* Order Actions */}
        <div className="flex gap-2 pt-2">
          <Link to={`/order/${order.id}`}>
            <Button variant="outline" size="sm">
              <FontAwesomeIcon icon={faEye} className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
