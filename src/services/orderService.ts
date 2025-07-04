import { api } from "./api"
import type { CheckoutData, Order, OrderStatus } from "@/types/order"

export interface RevenueData {
  month: string
  revenue: number
  orders: number
}

// Helper: parse raw Order
function parseOrder(raw: any): Order {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
    items: raw.items.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    })),
    vouchers: raw.vouchers.map((v: any) => ({
      ...v,
      startDate: new Date(v.startDate),
      endDate: new Date(v.endDate),
    })),
  }
}

// Fetch orders by buyer
export async function fetchOrdersByBuyer(buyerId: string): Promise<Order[]> {
  const res = await api.get("/orders", { params: { buyerId } })
  return res.data.map(parseOrder)
}

// Fetch order by ID
export async function fetchOrderById(orderId: string): Promise<Order> {
  const res = await api.get(`/orders/${orderId}`)
  return parseOrder(res.data)
}

// Create order
export async function createOrder(data: CheckoutData): Promise<Order> {
  const res = await api.post("/orders", data)
  const order = res.data
  return {
    ...order,
    createdAt: new Date(order.createdAt),
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
  const res = await api.patch(`/orders/${orderId}/status`, { status })
  return parseOrder(res.data)
}

// Cancel order (shorthand)
export async function cancelOrder(orderId: string): Promise<Order> {
  return updateOrderStatus(orderId, "cancelled")
}

// Fetch orders by status
export async function fetchOrdersByStatus(buyerId: string, status: OrderStatus): Promise<Order[]> {
  const res = await api.get("/orders", {
    params: { buyerId, status },
  })
  return res.data.map(parseOrder)
}

// Search orders by keyword and status
export async function searchOrders(keyword: string, status?: OrderStatus | "all"): Promise<Order[]> {
  const params: Record<string, string> = {}
  if (keyword) params.q = keyword
  if (status && status !== "all") params.status = status

  const res = await api.get("/orders/search", { params })
  return res.data.map(parseOrder)
}

// Get orders by buyer ID (alias of fetchOrdersByBuyer)
export async function getOrdersByBuyerId(buyerId: string): Promise<Order[]> {
  return fetchOrdersByBuyer(buyerId)
}

// Delete order
export async function deleteOrder(orderId: string): Promise<void> {
  await api.delete(`/orders/${orderId}`)
}

// Get recent orders
export async function getRecentOrders(limit = 5): Promise<Order[]> {
  const res = await api.get("/orders/recent", { params: { limit } })
  return res.data.map(parseOrder)
}

// Get monthly revenue data
export async function getMonthlyRevenueData(): Promise<RevenueData[]> {
  const res = await api.get("/analytics/revenue")
  return res.data
}
