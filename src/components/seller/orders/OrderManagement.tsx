"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderStatusUpdate } from "./OrderStatsUpdate"
import { getAllOrders } from "@/data/order"
import { getProductById } from "@/data/product"
import { Search, Filter, Package, TrendingUp } from "lucide-react"
import type { Order, OrderStatus } from "@/types/order"

interface OrderManagementProps {
  sellerId?: string
}

export function OrderManagement({ sellerId }: OrderManagementProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")

  useEffect(() => {
    loadOrders()
  }, [sellerId])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const fetchedOrders = getAllOrders()
      setOrders(fetchedOrders)
    } catch (error) {
      console.error("Failed to load orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    // Search functionality
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchLower) ||
          order.buyerId.toLowerCase().includes(searchLower) ||
          order.deliveryAddress.toLowerCase().includes(searchLower) ||
          order.items.some((item) => {
            const product = getProductById(item.productId)
            return product?.name.toLowerCase().includes(searchLower)
          }),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }

  const handleStatusUpdated = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Calculate stats
  const getOrderStats = (orders: Order[]) => {
    const total = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
    const pending = orders.filter((order) => order.status === "pending").length
    const averageOrderValue = total > 0 ? totalRevenue / total : 0

    return {
      total,
      totalRevenue,
      pending,
      averageOrderValue,
    }
  }

  const stats = getOrderStats(orders)

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Package className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.averageOrderValue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-500" />
            Order Management
          </CardTitle>

          {/* Filters */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, buyers, or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value: OrderStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You don't have any orders yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">#{order.id.slice(-8)}</h4>
                        <OrderStatusUpdate
                          orderId={order.id}
                          currentStatus={order.status}
                          onStatusUpdated={handleStatusUpdated}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Buyer: {order.buyerId} • {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatCurrency(order.totalPrice)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 mb-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {getProductById(item.productId)?.name || `Product ${item.productId}`}
                          {item.selectedVariant && ` (${item.selectedVariant})`}
                          {" × "}
                          {item.quantity}
                        </span>
                        <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
                      </div>
                    ))}
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
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
