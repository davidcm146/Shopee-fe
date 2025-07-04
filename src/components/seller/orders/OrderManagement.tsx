"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllOrders } from "@/data/order"
import { getProductById } from "@/data/product"
import { Search, Filter, Package, TrendingUp } from "lucide-react"
import type { Order, OrderItemStatus } from "@/types/order"
import { OrderItem } from "./OrderItem"
import { Pagination } from "./Pagination"

interface OrderManagementProps {
  sellerId?: string
}

export function OrderManagement({ sellerId }: OrderManagementProps) {
  sellerId = sellerId || "seller5" // Default to a test seller ID if not provided
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderItemStatus | "all">("all")
  const ORDERS_PER_PAGE = 5

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  )

  useEffect(() => {
    loadOrders()
  }, [sellerId])

  useEffect(() => {
    filterOrders()
    setCurrentPage(1)
  }, [orders, searchTerm, statusFilter])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const fetchedOrders = await getAllOrders()
      const sellerOrders: Order[] = []

      for (const order of fetchedOrders) {
        const filteredItems = []

        for (const item of order.items) {
          const product = await getProductById(item.productId)
          console.log(item);
          if (product?.sellerId === sellerId) {
            filteredItems.push(item)
          }
        }

        if (filteredItems.length > 0) {
          sellerOrders.push({ ...order, items: filteredItems })
        }
      }

      setOrders(sellerOrders)
    } catch (error) {
      console.error("Failed to load orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = [...orders]

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter((order) =>
        order.id.toLowerCase().includes(searchLower) ||
        order.buyerId.toLowerCase().includes(searchLower) ||
        order.deliveryAddress.toLowerCase().includes(searchLower) ||
        order.items.some((item) => {
          const product = getProductById(item.productId)
          return product?.name.toLowerCase().includes(searchLower)
        })
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) =>
        order.items.some(
          (item) =>
            item.statusHistory[item.statusHistory.length - 1]?.status === statusFilter
        )
      )
    }

    setFilteredOrders(filtered)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getOrderStats = (orders: Order[]) => {
    const total = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
    const pending = orders.filter((order) =>
      order.items.some(
        (item) =>
          item.statusHistory[item.statusHistory.length - 1]?.status === "pending"
      )
    ).length
    const averageOrderValue = total > 0 ? totalRevenue / total : 0

    return {
      total,
      totalRevenue,
      pending,
      averageOrderValue,
    }
  }

  const stats = getOrderStats(orders)

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

            <Select value={statusFilter} onValueChange={(value: OrderItemStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
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
              {paginatedOrders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}

              {filteredOrders.length > 0 && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
