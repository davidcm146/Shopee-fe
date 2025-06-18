import type { Order, OrderItem, OrderStatus } from "../types/order"
import type { Voucher } from "@/types/voucher"

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

// Sample orders data using YOUR Order interface structure with complete Voucher objects
const sampleOrders: Order[] = [
  {
    id: "order_001",
    buyerId: "guest-user",
    paymentId: "payment_001",
    deliveryAddress: "123 Main St, City, State 12345",
    status: "delivered",
    totalPrice: 609.99,
    subtotal: 599.99,
    shipping: 10.0,
    vouchers: [],
    createdAt: new Date("2024-01-15T10:30:00Z"),
    items: [
      {
        id: "item_001",
        productId: 1,
        quantity: 1,
        unitPrice: 599.99,
        selectedVariant: "Space Gray",
        createdAt: new Date("2024-01-15T10:30:00Z"),
      },
    ],
  },
  {
    id: "order_002",
    buyerId: "guest-user",
    paymentId: "payment_002",
    deliveryAddress: "456 Oak Ave, Town, State 67890",
    status: "shipped",
    totalPrice: 204.99,
    subtotal: 199.99,
    shipping: 10.0,
    vouchers: [
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
    ],
    createdAt: new Date("2024-02-01T14:20:00Z"),
    items: [
      {
        id: "item_002",
        productId: 2,
        quantity: 1,
        unitPrice: 199.99,
        selectedVariant: "Black",
        createdAt: new Date("2024-02-01T14:20:00Z"),
      },
    ],
  },
  {
    id: "order_003",
    buyerId: "guest-user",
    paymentId: "payment_003",
    deliveryAddress: "789 Pine St, Village, State 13579",
    status: "pending",
    totalPrice: 45.99,
    subtotal: 39.99,
    shipping: 6.0,
    vouchers: [],
    createdAt: new Date("2024-02-10T09:15:00Z"),
    items: [
      {
        id: "item_003",
        productId: 3,
        quantity: 1,
        unitPrice: 39.99,
        selectedVariant: "Blue",
        createdAt: new Date("2024-02-10T09:15:00Z"),
      },
    ],
  },
  {
    id: "order_004",
    buyerId: "guest-user",
    paymentId: "payment_004",
    deliveryAddress: "321 Elm St, City, State 24680",
    status: "confirmed",
    totalPrice: 119.99,
    subtotal: 119.99,
    shipping: 0,
    vouchers: [
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
    ],
    createdAt: new Date("2024-02-05T16:45:00Z"),
    items: [
      {
        id: "item_004",
        productId: 4,
        quantity: 2,
        unitPrice: 59.99,
        selectedVariant: "White",
        createdAt: new Date("2024-02-05T16:45:00Z"),
      },
    ],
  },
  {
    id: "order_005",
    buyerId: "guest-user",
    paymentId: "payment_005",
    deliveryAddress: "654 Maple Dr, Town, State 97531",
    status: "packed",
    totalPrice: 81.99,
    subtotal: 89.99,
    shipping: 10.0,
    vouchers: [
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
    ],
    createdAt: new Date("2024-02-08T11:30:00Z"),
    items: [
      {
        id: "item_005",
        productId: 5,
        quantity: 1,
        unitPrice: 89.99,
        selectedVariant: "Red",
        createdAt: new Date("2024-02-08T11:30:00Z"),
      },
    ],
  },
  {
    id: "order_006",
    buyerId: "guest-user",
    paymentId: "payment_006",
    deliveryAddress: "987 Cedar Ln, Village, State 86420",
    status: "cancelled",
    totalPrice: 299.99,
    subtotal: 289.99,
    shipping: 10.0,
    vouchers: [],
    createdAt: new Date("2024-01-28T13:15:00Z"),
    items: [
      {
        id: "item_006",
        productId: 6,
        quantity: 1,
        unitPrice: 289.99,
        selectedVariant: "Black",
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
    productId: number
    quantity: number
    unitPrice: number
    selectedVariant?: string
  }>
}): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const now = new Date()
  const orderId = generateId()

  const orderItems: OrderItem[] = orderData.items.map((item) => ({
    id: generateId(),
    productId: item.productId,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    createdAt: now,
    selectedVariant: item.selectedVariant,
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
    status: "pending",
    totalPrice,
    subtotal: orderData.subtotal,
    shipping: orderData.shipping,
    vouchers: orderData.vouchers,
    createdAt: now,
    items: orderItems,
  }

  ordersData.unshift(newOrder)

  return newOrder
}

// Update order status
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const orderIndex = ordersData.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    ordersData[orderIndex] = { ...ordersData[orderIndex], status }
  }
}

// Cancel an order
export async function cancelOrder(orderId: string): Promise<void> {
  await updateOrderStatus(orderId, "cancelled")
}

// Get order by ID
export function getOrderById(orderId: string): Order | undefined {
  return ordersData.find((order) => order.id === orderId)
}

// Get orders for a specific user
export function getUserOrders(userId: string): Order[] {
  return ordersData.filter((order) => order.buyerId === userId)
}

// Get all orders
export function getAllOrders(): Order[] {
  return ordersData
}

// Get available vouchers for a user
export function getUserVouchers(userId: string): Voucher[] {
  return sampleVouchers.filter((voucher) => voucher.buyerId === userId)
}

// Reset to sample data
export function resetToSampleData(): void {
  ordersData = [...sampleOrders]
}
