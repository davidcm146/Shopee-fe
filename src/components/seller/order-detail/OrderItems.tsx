"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/data/product"
import { Package, Calendar, ShoppingBag, Truck, CheckCircle, XCircle, Check } from "lucide-react"
import type { OrderItem, OrderItemStatus } from "@/types/order"
import { updateOrderItemStatus } from "@/data/order"
import { useState } from "react"
import { OrderUpdateStats } from "./OrderUpdateStats"

interface OrderItemsProps {
  items: OrderItem[]
  orderId: string
  sellerId: string
  onItemUpdate?: () => void
}

export function OrderItems({ items, orderId, sellerId, onItemUpdate }: OrderItemsProps) {
  const [confirmingItems, setConfirmingItems] = useState<Set<number>>(new Set())

  // Define the order of statuses for the stepper
  const statusOrder: OrderItemStatus[] = ["pending", "confirmed", "packed", "shipping", "delivered"]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusIcon = (status: OrderItemStatus) => {
    switch (status) {
      case "pending":
        return Calendar
      case "confirmed":
        return ShoppingBag
      case "packed":
        return Package
      case "shipping":
        return Truck
      case "delivered":
        return CheckCircle
      case "cancelled":
        return XCircle
      default:
        return Package
    }
  }

  const getStatusColor = (status: OrderItemStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-indigo-500"
      case "packed":
        return "bg-purple-500"
      case "shipping":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (date: Date | string) => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString()
    }
    return date.toLocaleDateString()
  }

  const getStatusHistoryForStep = (item: OrderItem, status: OrderItemStatus) => {
    return item.statusHistory.find((history) => history.status === status)
  }

  const handleConfirmItem = async (itemIndex: number) => {
    setConfirmingItems((prev) => new Set(prev).add(itemIndex))
    try {
      await updateOrderItemStatus(orderId, itemIndex, "confirmed", "Order confirmed by seller")
      onItemUpdate?.()
      // Optionally refresh the page or update local state
      window.location.reload()
    } catch (error) {
      console.error("Failed to confirm order item:", error)
    } finally {
      setConfirmingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemIndex)
        return newSet
      })
    }
  }

  const ItemStatusStepper = ({ item, index }: { item: OrderItem; index: number }) => {
    const currentStatus = item.statusHistory[item.statusHistory.length - 1]?.status || "pending"
    const currentStatusIndex = statusOrder.indexOf(currentStatus)
    const isCancelled = currentStatus === "cancelled"

    if (isCancelled) {
      // Find when it was cancelled
      const cancelledHistory = item.statusHistory.find((h) => h.status === "cancelled")
      const lastValidStatus = item.statusHistory.filter((h) => h.status !== "cancelled").pop()?.status || "pending"
      const lastValidIndex = statusOrder.indexOf(lastValidStatus)

      return (
        <div className="mt-3">
          <div className="text-xs font-medium text-gray-600 mb-3">Status Progress:</div>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-gray-200">
              <div
                className="bg-red-500 w-full transition-all duration-500"
                style={{
                  height: lastValidIndex >= 0 ? `${((lastValidIndex + 1) / statusOrder.length) * 100}%` : "20%",
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-2">
              {statusOrder.map((status, stepIndex) => {
                const isCompleted = stepIndex <= lastValidIndex
                const StatusIcon = getStatusIcon(status)
                const statusHistory = getStatusHistoryForStep(item, status)

                return (
                  <div key={status} className="relative flex items-center gap-2">
                    <div
                      className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border transition-all ${isCompleted
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                        }`}
                    >
                      <StatusIcon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-medium capitalize ${isCompleted ? "text-gray-900" : "text-gray-400"
                            }`}
                        >
                          {status}
                        </span>
                        {statusHistory && (
                          <div className="text-right">
                            <div className="text-xs text-gray-500">{formatDate(statusHistory.updatedAt)}</div>
                          </div>
                        )}
                      </div>
                      {statusHistory?.notes && <div className="text-xs text-gray-500 mt-1">{statusHistory.notes}</div>}
                    </div>
                  </div>
                )
              })}

              {/* Cancelled Step */}
              <div className="relative flex items-center gap-2">
                <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full border bg-red-500 border-red-500 text-white">
                  <XCircle className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-red-600">Cancelled</span>
                    {cancelledHistory && (
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{formatDate(cancelledHistory.updatedAt)}</div>
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
          <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-gray-200">
            <div
              className="bg-orange-500 w-full transition-all duration-500"
              style={{
                height: currentStatusIndex >= 0 ? `${((currentStatusIndex + 1) / statusOrder.length) * 100}%` : "20%",
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {statusOrder.map((status, stepIndex) => {
              const isCompleted = stepIndex <= currentStatusIndex
              const isCurrent = stepIndex === currentStatusIndex
              const StatusIcon = getStatusIcon(status)
              const statusHistory = getStatusHistoryForStep(item, status)

              return (
                <div key={status} className="relative flex items-center gap-2">
                  <div
                    className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border transition-all ${isCompleted
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                      } ${isCurrent ? "ring-2 ring-orange-200" : ""}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-xs font-medium capitalize ${isCompleted ? "text-gray-900" : "text-gray-400"
                            }`}
                        >
                          {status}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Current
                          </span>
                        )}
                      </div>
                      {statusHistory && (
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{formatDate(statusHistory.updatedAt)}</div>
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
        {/* Update Status Button for non-pending items */}
        {item.statusHistory[item.statusHistory.length - 1].status !== "pending" &&
          item.statusHistory[item.statusHistory.length - 1].status !== "delivered" &&
          item.statusHistory[item.statusHistory.length - 1].status !== "cancelled" && (
            <div className="mt-3 pt-2 border-t">
              <OrderUpdateStats
                orderId={orderId}
                itemIndex={index}
                currentStatus={item.statusHistory[item.statusHistory.length - 1].status}
                productName={getProductById(item.productId)?.name || `Product ${item.productId}`}
                onStatusUpdated={onItemUpdate}
              />
            </div>
          )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-orange-500" />
          Order Items ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((item, index) => ({ item, index })) // giữ lại index ban đầu
            .filter(({ item }) => item.sellerId === sellerId) // lọc theo sellerId
            .map(({ item, index }) => {
              const product = getProductById(item.productId)
              const isConfirming = confirmingItems.has(index)
              const isPending = item.statusHistory[item.statusHistory.length - 1]?.status === "pending"

              return (
                <div key={index}>
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {product?.images?.[0] ? (
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{product?.name || `Product ${item.productId}`}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                            <span className="text-sm text-muted-foreground">
                              Unit Price: {formatCurrency(item.unitPrice)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(item.unitPrice * item.quantity)}</p>
                          <Badge className={`${getStatusColor(item.statusHistory[item.statusHistory.length - 1]?.status)} text-white text-xs mt-1`}>
                            {item.statusHistory[item.statusHistory.length - 1]?.status.charAt(0).toUpperCase() + item.statusHistory[item.statusHistory.length - 1]?.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      {/* Confirm Button for Pending Items */}
                      {isPending && (
                        <div className="mb-3">
                          <Button
                            onClick={() => handleConfirmItem(index)}
                            disabled={isConfirming}
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            {isConfirming ? "Confirming..." : "Confirm Order"}
                          </Button>
                        </div>
                      )}

                      {/* Status Stepper */}
                      <div className="bg-gray-50 p-3 rounded-lg border">
                        <ItemStatusStepper item={item} index={index} />
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <Separator className="mt-6" />}
                </div>
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
