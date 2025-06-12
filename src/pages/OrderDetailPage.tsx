"use client"

import { useParams } from "react-router-dom"
import { OrderHeader } from "../components/order-detail/OrderHeader"
import { OrderStatusCard } from "../components/order-detail/OrderStatusCard"
import { OrderItemsCard } from "../components/order-detail/OrderItemsCard"
import { DeliveryAddressCard } from "../components/order-detail/DeliveryAdressCard"
import { OrderSummarySidebar } from "../components/order-detail/OrderSummarySidebar"
import { OrderNotFound } from "../components/order/OrderNotFound"
import { useOrder } from "../context/OrderContext"

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const { getOrderById } = useOrder()

  const order = orderId ? getOrderById(orderId) : null

  if (!order) {
    return <OrderNotFound />
  }

  return (
    <div className="container py-6 mx-auto max-w-4xl">
      <OrderHeader orderId={order.orderId} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          <OrderStatusCard order={order} />
          <OrderItemsCard order={order} />
          <DeliveryAddressCard address={order.deliveryAddress} />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummarySidebar order={order} />
        </div>
      </div>
    </div>
  )
}
