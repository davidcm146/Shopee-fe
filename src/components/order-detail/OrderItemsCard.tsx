"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTruck,
  faTimes,
  faCalendarAlt,
  faShoppingBag,
  faBox,
  faCheckCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import type { Order, OrderItemStatus } from "../../types/order"
import { getProductById } from "@/data/product"
import { cancelOrderItem } from "../../data/order"
import { useState } from "react"
import { formatDate, formatTime } from "@/lib/dateTime.utils"

interface OrderItemsCardProps {
  order: Order
  onOrderUpdate?: () => void
}

export function OrderItemsCard({ order, onOrderUpdate }: OrderItemsCardProps) {
  const [cancellingItems, setCancellingItems] = useState<Set<number>>(new Set())

  // Define the order of statuses for the stepper
  const statusOrder: OrderItemStatus[] = ["pending", "confirmed", "packed", "shipping", "delivered"]

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

  const getStatusIcon = (status: OrderItemStatus) => {
    switch (status) {
      case "delivered":
        return faCheckCircle
      case "shipping":
        return faTruck
      case "packed":
        return faBox
      case "confirmed":
        return faShoppingBag
      case "pending":
        return faCalendarAlt
      case "cancelled":
        return faTimes
      default:
        return faCircle
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

  const getStatusHistoryForStep = (item: any, status: OrderItemStatus) => {
    return item.statusHistory.find((history: any) => history.status === status)
  }

  const ItemStatusStepper = ({ item, index }: { item: any; index: number }) => {
    const currentStatus = item.statusHistory[item.statusHistory.length - 1]?.status
    const currentStatusIndex = statusOrder.indexOf(currentStatus)
    const isCancelled = currentStatus === "cancelled"


    if (isCancelled) {
      // Find when it was cancelled
      const cancelledHistory = item.statusHistory.find((h: any) => h.status === "cancelled")
      const lastValidStatus = item.statusHistory.filter((h: any) => h.status !== "cancelled").pop()?.status || "pending"
      const lastValidIndex = statusOrder.indexOf(lastValidStatus)

      return (
        <div className="mt-3">
          <div className="text-xs font-medium text-gray-600 mb-3">Status Progress:</div>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200">
              <div
                className="bg-red-500 w-full transition-all duration-500"
                style={{
                  height: lastValidIndex >= 0 ? `${((lastValidIndex + 1) / statusOrder.length) * 100}%` : "20%",
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {statusOrder.map((status, stepIndex) => {
                const isCompleted = stepIndex <= lastValidIndex
                const statusHistory = getStatusHistoryForStep(item, status)

                return (
                  <div key={status} className="relative flex items-center gap-3">
                    <div
                      className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${isCompleted
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                        }`}
                    >
                      <FontAwesomeIcon icon={getStatusIcon(status)} className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-medium capitalize ${isCompleted ? "text-gray-900" : "text-gray-400"}`}
                        >
                          {status}
                        </span>
                        {statusHistory && (
                          <div className="text-right">
                            <div className="text-xs text-gray-500">{formatDate(statusHistory.updatedAt)}</div>
                            <div className="text-xs text-gray-400">{formatTime(statusHistory.updatedAt)}</div>
                          </div>
                        )}
                      </div>
                      {statusHistory?.notes && <div className="text-xs text-gray-500 mt-1">{statusHistory.notes}</div>}
                    </div>
                  </div>
                )
              })}

              {/* Cancelled Step */}
              <div className="relative flex items-center gap-3">
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-red-500 border-red-500 text-white">
                  <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-600">Cancelled</span>
                    {cancelledHistory && (
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{formatDate(cancelledHistory.updatedAt)}</div>
                        <div className="text-xs text-gray-400">{formatTime(cancelledHistory.updatedAt)}</div>
                      </div>
                    )}
                  </div>
                  {cancelledHistory?.notes && (
                    <div className="text-xs text-gray-500 mt-1">{cancelledHistory.notes}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="mt-3">
        <div className="text-xs font-medium text-gray-600 mb-3">Status Progress:</div>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200">
            <div
              className="bg-orange-500 w-full transition-all duration-500"
              style={{
                height: currentStatusIndex >= 0 ? `${((currentStatusIndex + 1) / statusOrder.length) * 100}%` : "20%",
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {statusOrder.map((status, stepIndex) => {
              const isCompleted = stepIndex <= currentStatusIndex
              const isCurrent = status === currentStatus
              const statusHistory = getStatusHistoryForStep(item, status)

              return (
                <div key={status} className="relative flex items-center gap-3">
                  <div
                    className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${isCompleted
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                      } ${isCurrent ? "ring-2 ring-orange-200" : ""}`}
                  >
                    <FontAwesomeIcon icon={getStatusIcon(status)} className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium capitalize ${isCompleted ? "text-gray-900" : "text-gray-400"}`}
                        >
                          {status}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Current
                          </span>
                        )}
                      </div>
                      {statusHistory && (
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{formatDate(statusHistory.updatedAt)}</div>
                          <div className="text-xs text-gray-400">{formatTime(statusHistory.updatedAt)}</div>
                        </div>
                      )}
                    </div>
                    {statusHistory?.notes && <div className="text-xs text-gray-500 mt-1">{statusHistory.notes}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items ({order.items.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {order.items.map((item, index) => {
            const product = getProductById(item.productId)
            const isItemCancelling = cancellingItems.has(index)

            return (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <div className="flex gap-4">
                  <img
                    src={product?.images?.[0] || "/placeholder.svg?height=64&width=64"}
                    alt={product?.name || "Product"}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{product?.name || `Product ${item.productId}`}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} × ${item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                        <Badge className={`${getItemStatusColor(item.statusHistory[item.statusHistory.length - 1].status)} text-white text-xs`}>
                          {item.statusHistory[item.statusHistory.length - 1].status.charAt(0).toUpperCase() + item.statusHistory[item.statusHistory.length - 1].status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Item Status Stepper */}
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <ItemStatusStepper item={item} index={index} />
                    </div>

                    {/* Item Actions */}
                    {canCancelItem(item.statusHistory[item.statusHistory.length - 1].status) && (
                      <div className="pt-2 border-t">
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
                      </div>
                    )}
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
