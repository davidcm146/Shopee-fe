import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faShoppingBag,
  faTruck,
  faBox,
  faCheckCircle,
  faCalendarAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import type { Order, OrderStatus } from "../../types/order"

interface OrderStatusCardProps {
  order: Order
}

export function OrderStatusCard({ order }: OrderStatusCardProps) {
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

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return faCheckCircle
      case "shipped":
        return faTruck
      case "packed":
        return faBox
      case "confirmed":
        return faShoppingBag
      case "pending":
        return faCalendarAlt
      case "cancelled":
        return faArrowLeft
      default:
        return faShoppingBag
    }
  }

  const getStepIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return faCalendarAlt
      case "confirmed":
        return faShoppingBag
      case "packed":
        return faBox
      case "shipped":
        return faTruck
      case "delivered":
        return faCheckCircle
      default:
        return faShoppingBag
    }
  }

  const orderStatuses: OrderStatus[] = ["pending", "confirmed", "packed", "shipped", "delivered"]
  const currentStatusIndex = orderStatuses.indexOf(order.status)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={getStatusIcon(order.status)} className="h-5 w-5" />
          Order Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-6">
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
          <span className="text-sm text-muted-foreground">Last updated: {order.createdAt.toLocaleDateString()}</span>
        </div>

        {/* Status Stepper */}
        {order.status !== "cancelled" ? (
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200">
              <div
                className="bg-orange-500 w-full transition-all duration-500 ease-in-out"
                style={{
                  height:
                    currentStatusIndex >= 0 ? `${(currentStatusIndex / (orderStatuses.length - 1)) * 100}%` : "0%",
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {orderStatuses.map((status, index) => {
                const isCompleted = index <= currentStatusIndex
                const isCurrent = index === currentStatusIndex

                return (
                  <div key={status} className="relative flex items-center gap-4">
                    {/* Step Circle */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      } ${isCurrent ? "ring-4 ring-orange-100" : ""}`}
                    >
                      <FontAwesomeIcon
                        icon={getStepIcon(status)}
                        className={`h-5 w-5 ${isCompleted ? "text-white" : "text-gray-400"}`}
                      />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className={`font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {status === "pending" && "Order has been placed"}
                        {status === "confirmed" && "Order confirmed by seller"}
                        {status === "packed" && "Order is being packed"}
                        {status === "shipped" && "Order is on the way"}
                        {status === "delivered" && "Order has been delivered"}
                      </p>
                      {isCurrent && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Current Status
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Completion Time */}
                    {isCompleted && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{order.createdAt.toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Cancelled Status */
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white">
              <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-red-800">Order Cancelled</h3>
              <p className="text-sm text-red-600">This order has been cancelled</p>
              <p className="text-xs text-red-500 mt-1">
                {order.createdAt.toLocaleDateString()} at{" "}
                {order.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
