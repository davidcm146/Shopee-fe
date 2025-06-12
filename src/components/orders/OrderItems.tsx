"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faDownload, faTimes } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useOrder } from "../../context/OrderContext"
import type { Order, OrderStatus } from "../../types/order"
import { getProductById } from "@/data/product"

interface OrderItemProps {
  order: Order
}

export function OrderItem({ order }: OrderItemProps) {
  const { cancelOrder } = useOrder()
  const [cancellingOrder, setCancellingOrder] = useState(false)

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "shipped":
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

  const canCancelOrder = (status: OrderStatus) => {
    return status === "pending" || status === "confirmed"
  }

  const handleCancelOrder = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setCancellingOrder(true)
      try {
        await cancelOrder(order.orderId)
      } catch (error) {
        console.error("Failed to cancel order:", error)
      } finally {
        setCancellingOrder(false)
      }
    }
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold">Order #{order.orderId.slice(-8)}</h3>
          <p className="text-sm text-muted-foreground">{order.createdAt.toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-muted-foreground mb-1">{order.items.length} items:</p>
        <div className="space-y-1">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                { getProductById(item.productId)?.name || `Product ${item.productId}`} x {item.quantity}
                {item.selectedVariant && ` (${item.selectedVariant})`}
              </span>
              <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-muted-foreground">Delivery Address:</p>
        <p className="text-sm">{order.deliveryAddress}</p>
      </div>

      <div className="flex gap-2">
        <Link to={`/order/${order.orderId}`}>
          <Button variant="outline" size="sm">
            <FontAwesomeIcon icon={faEye} className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </Link>
        <Button variant="outline" size="sm">
          <FontAwesomeIcon icon={faDownload} className="h-3 w-3 mr-1" />
          Invoice
        </Button>
        {canCancelOrder(order.status) && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelOrder}
            disabled={cancellingOrder}
            className="text-red-600 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTimes} className="h-3 w-3 mr-1" />
            {cancellingOrder ? "Cancelling..." : "Cancel"}
          </Button>
        )}
      </div>
    </div>
  )
}
