"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Eye, Clock, CheckCircle, Package, Truck, AlertCircle } from "lucide-react"
import type { Order, OrderStatus } from "@/types/order"
// import { OrderStatusUpdate } from "../orders/OrderStatsUpdate"
import { getAllOrders } from "@/data/order"
import { getProductById } from "@/data/product"

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const fetchedOrders = getAllOrders()
      // Show only the 5 most recent orders, sorted by creation date
      const sortedOrders = fetchedOrders
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
      setOrders(sortedOrders)
    } catch (error) {
      console.error("Failed to load orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdated = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    )
  }

  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      confirmed: { variant: "default" as const, icon: CheckCircle, color: "text-blue-600" },
      packed: { variant: "default" as const, icon: Package, color: "text-purple-600" },
      shipped: { variant: "default" as const, icon: Truck, color: "text-orange-600" },
      delivered: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      cancelled: { variant: "destructive" as const, icon: AlertCircle, color: "text-red-600" },
    }

    const config = statusConfig[status]
    const StatusIcon = config.icon
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <StatusIcon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Calculate order stats
  const getOrderStats = (orders: Order[]) => {
    const stats = {
      pending: 0,
      confirmed: 0,
      packed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    }

    orders.forEach((order) => {
      stats[order.status]++
    })

    return stats
  }

  const stats = getOrderStats(orders)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-orange-500" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-orange-500" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No orders found</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-orange-500" />
          Recent Orders
        </CardTitle>
        <Button variant="outline" size="sm">
          View All Orders
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium">#{order.id.slice(-8)}</h4>
                  {/* <OrderStatusUpdate
                    orderId={order.id}
                    currentStatus={order.status}
                    onStatusUpdated={handleStatusUpdated}
                  /> */}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {order.items.map((item, index) => (
                    <span key={item.id}>
                      {getProductById(item.productId)?.name || `Product ${item.productId}`}
                      {item.selectedVariant && ` (${item.selectedVariant})`}
                      {" × "}
                      {item.quantity}
                      {index < order.items.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</div>
                {order.vouchers && order.vouchers.length > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    Vouchers: {order.vouchers.map((v) => v.title).join(", ")}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(order.totalPrice)}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-600">{stats.confirmed}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </div>
            <div>
              <p className="text-lg font-bold text-orange-600">{stats.shipped}</p>
              <p className="text-xs text-muted-foreground">Shipped</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">{stats.delivered}</p>
              <p className="text-xs text-muted-foreground">Delivered</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
