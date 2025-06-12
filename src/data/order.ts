"use server"

import type { Order, OrderStatus } from "@/types/order"

// Mock data - in a real app, this would come from a database
const mockOrders: Order[] = [
  {
    orderId: "ORD-001",
    buyerId: "buyer1",
    sellerId: "seller1",
    paymentId: "pay1",
    deliveryAddress: "123 Main St, City",
    status: "pending",
    totalPrice: 299.99,
    subtotal: 279.99,
    tax: 20.0,
    shipping: 0,
    voucherDiscount: 0,
    createdAt: new Date("2024-01-15T10:30:00"),
    items: [
      {
        id: "item1",
        orderId: "ORD-001",
        productId: 1,
        quantity: 2,
        unitPrice: 139.99,
        createdAt: new Date("2024-01-15T10:30:00"),
        product: { name: "Wireless Bluetooth Headphones" },
        selectedVariant: "Black",
      },
    ],
  },
  {
    orderId: "ORD-002",
    buyerId: "buyer2",
    sellerId: "seller1",
    paymentId: "pay2",
    deliveryAddress: "456 Oak Ave, Town",
    status: "confirmed",
    totalPrice: 89.99,
    subtotal: 79.99,
    tax: 10.0,
    shipping: 0,
    voucherDiscount: 5.0,
    voucherId: "voucher1",
    voucherCode: "SAVE5",
    createdAt: new Date("2024-01-15T09:15:00"),
    items: [
      {
        id: "item2",
        orderId: "ORD-002",
        productId: 2,
        quantity: 1,
        unitPrice: 79.99,
        createdAt: new Date("2024-01-15T09:15:00"),
        product: { name: "Smart Phone Case" },
        selectedVariant: "Blue",
      },
    ],
  },
  {
    orderId: "ORD-003",
    buyerId: "buyer3",
    sellerId: "seller1",
    paymentId: "pay3",
    deliveryAddress: "789 Pine St, Village",
    status: "shipped",
    totalPrice: 45.99,
    subtotal: 39.99,
    tax: 6.0,
    shipping: 0,
    createdAt: new Date("2024-01-14T16:45:00"),
    items: [
      {
        id: "item3",
        orderId: "ORD-003",
        productId: 3,
        quantity: 3,
        unitPrice: 13.33,
        createdAt: new Date("2024-01-14T16:45:00"),
        product: { name: "USB-C Charging Cable" },
        selectedVariant: "White",
      },
    ],
  },
  {
    orderId: "ORD-004",
    buyerId: "buyer4",
    sellerId: "seller1",
    paymentId: "pay4",
    deliveryAddress: "321 Elm St, City",
    status: "delivered",
    totalPrice: 159.99,
    subtotal: 149.99,
    tax: 10.0,
    shipping: 0,
    createdAt: new Date("2024-01-14T11:20:00"),
    items: [
      {
        id: "item4",
        orderId: "ORD-004",
        productId: 4,
        quantity: 1,
        unitPrice: 149.99,
        createdAt: new Date("2024-01-14T11:20:00"),
        product: { name: "Laptop Stand" },
        selectedVariant: "Silver",
      },
    ],
  },
  {
    orderId: "ORD-005",
    buyerId: "buyer5",
    sellerId: "seller1",
    paymentId: "pay5",
    deliveryAddress: "654 Maple Dr, Town",
    status: "cancelled",
    totalPrice: 199.99,
    subtotal: 189.99,
    tax: 10.0,
    shipping: 0,
    voucherDiscount: 10.0,
    voucherId: "voucher2",
    voucherCode: "SAVE10",
    createdAt: new Date("2024-01-13T14:30:00"),
    items: [
      {
        id: "item5",
        orderId: "ORD-005",
        productId: 5,
        quantity: 1,
        unitPrice: 189.99,
        createdAt: new Date("2024-01-13T14:30:00"),
        product: { name: "Wireless Mouse" },
        selectedVariant: "Black",
      },
    ],
  },
  {
    orderId: "ORD-006",
    buyerId: "buyer6",
    sellerId: "seller1",
    paymentId: "pay6",
    deliveryAddress: "987 Cedar Ln, Village",
    status: "packed",
    totalPrice: 79.99,
    subtotal: 69.99,
    tax: 10.0,
    shipping: 0,
    createdAt: new Date("2024-01-16T14:20:00"),
    items: [
      {
        id: "item6",
        orderId: "ORD-006",
        productId: 6,
        quantity: 1,
        unitPrice: 69.99,
        createdAt: new Date("2024-01-16T14:20:00"),
        product: { name: "Phone Charger" },
        selectedVariant: "USB-C",
      },
    ],
  },
]

// Server Actions
export async function updateOrderStatusInDb(orderId: string, newStatus: OrderStatus, sellerId: string) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Find the order
    const orderIndex = mockOrders.findIndex((order) => order.orderId === orderId)

    if (orderIndex === -1) {
      return false
    }

    const order = mockOrders[orderIndex]

    // Check if seller owns the order
    if (order.sellerId !== sellerId) {
      return false
    }

    // Validate status transitions
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["packed", "cancelled"],
      packed: ["shipped", "cancelled"],
      shipped: ["delivered"],
      delivered: [], // Final state
      cancelled: [], // Final state
    }

    const allowedStatuses = validTransitions[order.status] || []

    if (!allowedStatuses.includes(newStatus)) {
      return false
    }

    // Update the order status
    mockOrders[orderIndex] = {
      ...order,
      status: newStatus,
    }

    return true
  } catch (error) {
    console.error("Error updating order status:", error)
    return false
  }
}

// Data fetching functions
export async function getOrdersBySeller(sellerId: string): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockOrders.filter((order) => order.sellerId === sellerId)
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockOrders.find((order) => order.orderId === orderId) || null
}

export async function getOrdersByStatus(sellerId: string, status: OrderStatus): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return mockOrders.filter((order) => order.sellerId === sellerId && order.status === status)
}

// Utility functions (these don't need to be server actions)
export function getValidStatusTransitions(currentStatus: OrderStatus): OrderStatus[] {
  const transitions: Record<OrderStatus, OrderStatus[]> = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["packed", "cancelled"],
    shipped: ["delivered"],
    packed: ["shipped", "cancelled"],
    delivered: [],
    cancelled: [],
  }

  return transitions[currentStatus] || []
}

export function getOrderStats(orders: Order[]) {
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    packed: orders.filter((o) => o.status === "packed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    totalRevenue: orders.filter((o) => o.status !== "cancelled").reduce((sum, order) => sum + order.totalPrice, 0),
    averageOrderValue: 0,
  }

  stats.averageOrderValue = stats.total > 0 ? stats.totalRevenue / (stats.total - stats.cancelled) : 0

  return stats
}

export function searchOrders(orders: Order[], searchTerm: string): Order[] {
  if (!searchTerm) return orders

  const term = searchTerm.toLowerCase()

  return orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(term) ||
      order.buyerId.toLowerCase().includes(term) ||
      order.deliveryAddress.toLowerCase().includes(term) ||
      order.items.some(
        (item) =>
          item.product?.name?.toLowerCase().includes(term) || item.selectedVariant?.toLowerCase().includes(term),
      ),
  )
}

export function filterOrdersByDateRange(orders: Order[], startDate: Date, endDate: Date): Order[] {
  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt)
    return orderDate >= startDate && orderDate <= endDate
  })
}
