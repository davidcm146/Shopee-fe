"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getOrderById } from "@/data/order"
import { Package, ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import type { Order } from "@/types/order"

// Import all the separated components
import { OrderHeader } from "@/components/seller/order-detail/OrderHeader"
// import { OrderProgress } from "@/components/seller/order-detail/OrderProgress"
import { OrderItems } from "@/components/seller/order-detail/OrderItems"
import { OrderVouchers } from "@/components/seller/order-detail/OrderVouchers"
import { CustomerInfo } from "@/components/seller/order-detail/CustomerInfo"
import { DeliveryInfo } from "@/components/seller/order-detail/DeliveryInfo"
import { PaymentInfo } from "@/components/seller/order-detail/PaymentInfo"
import { OrderSummary } from "@/components/seller/order-detail/OrderSummary"

export function OrderDetail() {
  const sellerId: string = "sellerA"
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrder()
  }, [id])

  const loadOrder = async () => {
    try {
      setLoading(true)
      const fetchedOrder = getOrderById(id as string)
      setOrder(fetchedOrder)
    } catch (error) {
      console.error("Failed to load order:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdated = (orderId: string) => {
    if (order) {
      setOrder({ ...order, })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
              <p className="text-muted-foreground">Loading order details...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Order not found</h3>
              <p className="text-muted-foreground mb-4">
                The order you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link to="/seller/orders">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Orders
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <OrderHeader order={order} onStatusUpdated={handleStatusUpdated} />

      {/* Order Progress */}
      {/* <OrderProgress status={order.status} /> */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Items and Vouchers */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItems orderId={order.id} items={order.items} sellerId={sellerId} />
          <OrderVouchers vouchers={order.vouchers} />
        </div>

        {/* Order Summary & Details */}
        <div className="space-y-6">
          <CustomerInfo buyerId={order.buyerId} createdAt={order.createdAt} />
          <DeliveryInfo deliveryAddress={order.deliveryAddress} />
          <PaymentInfo paymentId={order.paymentId} />
          <OrderSummary
            subtotal={order.subtotal}
            totalPrice={order.totalPrice}
            vouchers={order.vouchers}
          />
        </div>
      </div>
    </div>
  )
}
