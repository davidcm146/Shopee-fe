import type { Order, OrderItemStatus } from "@/types/order"
import { getProductById } from "@/data/product"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Eye, Package } from "lucide-react"
import { formatDate } from "@/lib/dateTime.utils"

interface OrderItemProps {
  order: Order
  onStatusUpdated?(orderId: string): void
}

export const OrderItem = ({ order, onStatusUpdated }: OrderItemProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getItemStatusColor = (status: OrderItemStatus) => {
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

  // Get status summary for items
  const getItemStatusSummary = () => {
    const statusCounts = order.items.reduce(
      (acc, item) => {
        const currentStatus = item.statusHistory[item.statusHistory.length - 1].status
        acc[currentStatus] = (acc[currentStatus] || 0) + 1
        return acc
      },
      {} as Record<OrderItemStatus, number>,
    )

    return Object.entries(statusCounts)
      .map(([status, count]) => `${count} ${status}`)
      .join(", ")
  }

  return (
    <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold">#{order.id.slice(-8)}</h4>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/seller/orders/${order.id}`}>
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Buyer: {order.buyerId} • {formatDate(order.createdAt)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Items: {getItemStatusSummary()}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">{formatCurrency(order.totalPrice)}</p>
          <p className="text-sm text-muted-foreground">
            {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
          </p>
        </div>
      </div>

      {/* Order Items with Individual Status */}
      <div className="space-y-2 mb-3">
        <h5 className="text-sm font-medium text-gray-700">Items:</h5>
        {order.items.map((item, index) => {
          const product = getProductById(item.productId)
          return (
            <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                  {product?.images?.[0] ? (
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <Package className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium">{product?.name || `Product ${item.productId}`}</span>
                  <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{formatCurrency(item.unitPrice * item.quantity)}</span>
                <Badge className={`${getItemStatusColor(item.statusHistory[item.statusHistory.length - 1].status)} text-white text-xs`}>
                  {item.statusHistory[item.statusHistory.length - 1].status.charAt(0).toUpperCase() + item.statusHistory[item.statusHistory.length - 1].status.slice(1)}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>

      {/* Delivery Address */}
      <div className="text-sm text-muted-foreground border-t pt-2">
        <strong>Delivery:</strong> {order.deliveryAddress}
      </div>

      {/* Voucher Info */}
      {order.vouchers && order.vouchers.length > 0 && (
        <div className="text-sm text-green-600 mt-1">
          <strong>Vouchers Applied:</strong> {order.vouchers.map((v) => v.title).join(", ")}
        </div>
      )}

      {/* Quick Actions for Pending Items */}
      {order.items.some((item) => item.statusHistory[item.statusHistory.length - 1].status === "pending") && (
        <div className="mt-3 pt-2 border-t">
          <p className="text-xs text-orange-600 font-medium">
            ⚠️ {order.items.filter((item) => item.statusHistory[item.statusHistory.length - 1].status === "pending").length} item(s) need confirmation
          </p>
        </div>
      )}
    </div>
  )
}
