import type { Order, OrderItem, OrderItemStatus } from "../types/order"
import type { Voucher } from "../types/voucher"

// Simple ID generation function
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Sample vouchers data
const sampleVouchers: Voucher[] = [
  {
    id: "voucher_001",
    buyerId: "guest-user",
    discount: 5.0,
    type: "fixed_amount",
    startDate: new Date("2024-01-01T00:00:00Z"),
    endDate: new Date("2024-12-31T23:59:59Z"),
    status: "used",
    condition: "Minimum order of $50",
    title: "New User Discount",
    description: "Get $5 off your first order",
    minOrderAmount: 50,
    maxDiscountAmount: 5,
  },
  {
    id: "voucher_002",
    buyerId: "guest-user",
    discount: 10,
    type: "percentage",
    startDate: new Date("2024-01-01T00:00:00Z"),
    endDate: new Date("2024-12-31T23:59:59Z"),
    status: "used",
    condition: "Minimum order of $100",
    title: "Welcome Discount",
    description: "Get 10% off orders over $100",
    minOrderAmount: 100,
    maxDiscountAmount: 50,
  },
  {
    id: "voucher_003",
    buyerId: "guest-user",
    discount: 0,
    type: "free_shipping",
    startDate: new Date("2024-01-01T00:00:00Z"),
    endDate: new Date("2024-12-31T23:59:59Z"),
    status: "used",
    condition: "Any order amount",
    title: "Free Shipping",
    description: "Free shipping on any order",
    minOrderAmount: 0,
  },
]

// Sample orders data with updated structure matching your types
const sampleOrders: Order[] = [
  {
    id: "order_001",
    buyerId: "guest-user",
    paymentId: "payment_001",
    deliveryAddress: "123 Main St, City, State 12345",
    totalPrice: 839.98,
    subtotal: 829.98,
    vouchers: [],
    createdAt: new Date("2024-01-15T10:30:00Z"),
    items: [
      {
        productId: "1",
        sellerId: "sellerA",
        quantity: 1,
        unitPrice: 599.99,
        statusHistory: [
          { status: "delivered", updatedAt: new Date("2024-01-18T16:30:00Z"), notes: "Delivered" }
        ],
        createdAt: new Date("2024-01-15T10:30:00Z"),
      },
      {
        productId: "3",
        sellerId: "sellerB",
        quantity: 1,
        unitPrice: 229.99,
        statusHistory: [
          { status: "delivered", updatedAt: new Date("2024-01-18T16:30:00Z"), notes: "Delivered" }
        ],
        createdAt: new Date("2024-01-15T10:30:00Z"),
      },
    ],
  },
  {
    id: "order_002",
    buyerId: "guest-user",
    paymentId: "payment_002",
    deliveryAddress: "456 Oak Ave, Town, State 67890",
    totalPrice: 259.98,
    subtotal: 259.98,
    vouchers: [],
    createdAt: new Date("2024-02-01T14:20:00Z"),
    items: [
      {
        productId: "2",
        sellerId: "sellerA",
        quantity: 1,
        unitPrice: 199.99,
        statusHistory: [{ status: "packed", updatedAt: new Date("2024-02-02T16:00:00Z"), notes: "Packed" }],
        createdAt: new Date("2024-02-01T14:20:00Z"),
      },
      {
        productId: "5",
        sellerId: "sellerB",
        quantity: 1,
        unitPrice: 59.99,
        statusHistory: [{ status: "confirmed", updatedAt: new Date("2024-02-02T16:00:00Z"), notes: "Confirmed" }],
        createdAt: new Date("2024-02-01T14:20:00Z"),
      },
    ],
  },
  {
    id: "order_003",
    buyerId: "guest-user",
    paymentId: "payment_003",
    deliveryAddress: "789 Pine St, Village, State 13579",
    totalPrice: 45.99,
    subtotal: 39.99,
    vouchers: [],
    createdAt: new Date("2024-02-10T09:15:00Z"),
    items: [
      {
        productId: "3",
        sellerId: "sellerB",
        quantity: 1,
        unitPrice: 39.99,
        statusHistory: [{ status: "pending", updatedAt: new Date("2024-02-10T09:15:00Z") }],
        createdAt: new Date("2024-02-10T09:15:00Z"),
      },
    ],
  },
  {
    id: "order_004",
    buyerId: "guest-user",
    paymentId: "payment_004",
    deliveryAddress: "321 Elm St, City, State 24680",
    totalPrice: 119.98,
    subtotal: 119.98,
    vouchers: [],
    createdAt: new Date("2024-02-05T16:45:00Z"),
    items: [
      {
        productId: "4",
        sellerId: "sellerC",
        quantity: 2,
        unitPrice: 59.99,
        statusHistory: [
          { status: "confirmed", updatedAt: new Date("2024-02-05T17:30:00Z") },
        ],
        createdAt: new Date("2024-02-05T16:45:00Z"),
      },
    ],
  },
  {
    id: "order_005",
    buyerId: "guest-user",
    paymentId: "payment_005",
    deliveryAddress: "654 Maple Dr, Town, State 97531",
    totalPrice: 89.99,
    subtotal: 89.99,
    vouchers: [],
    createdAt: new Date("2024-02-08T11:30:00Z"),
    items: [
      {
        productId: "5",
        sellerId: "sellerB",
        quantity: 1,
        unitPrice: 89.99,
        statusHistory: [{ status: "packed", updatedAt: new Date("2024-02-09T09:00:00Z") }],
        createdAt: new Date("2024-02-08T11:30:00Z"),
      },
    ],
  },
  {
    id: "order_006",
    buyerId: "guest-user",
    paymentId: "payment_006",
    deliveryAddress: "987 Cedar Ln, Village, State 86420",
    totalPrice: 299.99,
    subtotal: 289.99,
    vouchers: [],
    createdAt: new Date("2024-01-28T13:15:00Z"),
    items: [
      {
        productId: "6",
        sellerId: "sellerA",
        quantity: 1,
        unitPrice: 289.99,
        statusHistory: [
          { status: "cancelled", updatedAt: new Date("2024-01-28T14:00:00Z") },
        ],
        createdAt: new Date("2024-01-28T13:15:00Z"),
      },
    ],
  },
]


// In-memory orders storage
let ordersData: Order[] = [...sampleOrders]

// Create a new order
export async function createOrder(orderData: {
  buyerId: string
  paymentId: string
  deliveryAddress: string
  subtotal: number
  shipping: number
  vouchers: Voucher[]
  items: Array<{
    sellerId: string
    productId: string
    quantity: number
    unitPrice: number
  }>
}): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const now = new Date()
  const orderId = generateId()

  const orderItems: OrderItem[] = orderData.items.map((item) => ({
    productId: item.productId,
    sellerId: item.sellerId,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    currentStatus: "pending",
    statusHistory: [
      {
        status: "pending",
        updatedAt: now,
        notes: "Order placed",
      },
    ],
    createdAt: now,
  }))

  let totalPrice = orderData.subtotal + orderData.shipping

  orderData.vouchers.forEach((voucher) => {
    if (voucher.type === "fixed_amount") {
      totalPrice -= voucher.discount
    } else if (voucher.type === "percentage") {
      const discountAmount = (orderData.subtotal * voucher.discount) / 100
      const maxDiscount = voucher.maxDiscountAmount || discountAmount
      totalPrice -= Math.min(discountAmount, maxDiscount)
    } else if (voucher.type === "free_shipping") {
      totalPrice -= orderData.shipping
    }
  })

  totalPrice = Math.max(0, totalPrice)

  const newOrder: Order = {
    id: orderId,
    buyerId: orderData.buyerId,
    paymentId: orderData.paymentId,
    deliveryAddress: orderData.deliveryAddress,
    totalPrice,
    subtotal: orderData.subtotal,
    vouchers: orderData.vouchers,
    createdAt: now,
    items: orderItems,
  }

  ordersData.unshift(newOrder)

  return newOrder
}

// Update order item status
export async function updateOrderItemStatus(
  orderId: string,
  itemIndex: number,
  newStatus: OrderItemStatus,
  notes?: string,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const orderIndex = ordersData.findIndex((order) => order.id === orderId)
  if (orderIndex === -1) {
    throw new Error("Order not found")
  }

  const order = ordersData[orderIndex]
  if (itemIndex < 0 || itemIndex >= order.items.length) {
    throw new Error("Order item not found")
  }

  const item = order.items[itemIndex]

  // Update item status and add to history
  const updatedItem: OrderItem = {
    ...item,
    statusHistory: [
      ...item.statusHistory,
      {
        status: newStatus,
        updatedAt: new Date(),
        notes: notes || `Status updated to ${newStatus}`,
      },
    ],
  }

  // Update the order with new item status
  const updatedItems = [...order.items]
  updatedItems[itemIndex] = updatedItem

  ordersData[orderIndex] = {
    ...order,
    items: updatedItems,
  }
}

// Cancel an order item
export async function cancelOrderItem(orderId: string, itemIndex: number): Promise<void> {
  await updateOrderItemStatus(orderId, itemIndex, "cancelled", "Cancelled by customer")
}

// Update order status (legacy function - now calculates based on items)
export async function updateOrderStatus(orderId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const orderIndex = ordersData.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    ordersData[orderIndex] = { ...ordersData[orderIndex]}
  }
}

// Cancel an entire order (cancels all items)
export async function cancelOrder(orderId: string): Promise<void> {
  const order = getOrderById(orderId)
  if (!order) {
    throw new Error("Order not found")
  }

  // Cancel all items in the order
  for (let i = 0; i < order.items.length; i++) {
    if (order.items[i].statusHistory[order.items[i].statusHistory.length - 1].status !== "cancelled") {
      await cancelOrderItem(orderId, i)
    }
  }
}

// Get order by ID
export function getOrderById(orderId: string): Order | undefined {
  return ordersData.find((order) => order.id === orderId)
}

// Get orders for a specific user
export function getUserOrders(userId: string): Order[] {
  return ordersData
    .filter((order) => order.buyerId === userId)
    .map((order) => ({
      ...order,
    }))
}

// Get all orders
export function getAllOrders(): Order[] {
  return ordersData.map((order) => ({
    ...order,
  }))
}

// Get available vouchers for a user
export function getUserVouchers(userId: string): Voucher[] {
  return sampleVouchers.filter((voucher) => voucher.buyerId === userId)
}

// Reset to sample data
export function resetToSampleData(): void {
  ordersData = [...sampleOrders]
}


export async function getUserOrdersBySellerProduct(userId: string): Promise<Order[]> {
  const rawOrders = await getUserOrders(userId) // vẫn là hàm gốc lấy order gộp

  const separatedOrders: Order[] = []

  for (const order of rawOrders) {
    // Group items by sellerId trực tiếp từ item.sellerId
    const groupedBySeller = new Map<string, OrderItem[]>()

    for (const item of order.items) {
      const sellerId = item.sellerId
      if (!sellerId) continue // bỏ qua nếu thiếu

      if (!groupedBySeller.has(sellerId)) {
        groupedBySeller.set(sellerId, [])
      }

      groupedBySeller.get(sellerId)!.push(item)
    }

    for (const [sellerId, items] of groupedBySeller.entries()) {
      const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
      const totalPrice = subtotal

      separatedOrders.push({
        ...order,
        id: `${order.id}+${sellerId}`,
        items,
        subtotal,
        totalPrice,
      })
    }
  }

  return separatedOrders
}
