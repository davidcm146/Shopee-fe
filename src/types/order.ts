export interface Order {
  orderId: string
  buyerId: string
  sellerId: string
  paymentId: string
  deliveryAddress: string
  status: OrderStatus
  totalPrice: number
  subtotal: number
  tax: number
  shipping: number
  voucherDiscount?: number
  voucherId?: string
  voucherCode?: string
  createdAt: Date
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: number // Using number to match our existing product IDs
  quantity: number
  unitPrice: number
  createdAt: Date

  // Additional fields for UI display
  product?: any
  selectedVariant?: string
}

export type OrderStatus = "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled"

export interface CheckoutData {
  deliveryAddress: string
  paymentMethod: string
  paymentDetails?: any
  appliedVoucherId?: string
}

export interface CreateOrderRequest {
  buyerId: string
  sellerId: string
  items: {
    productId: number
    quantity: number
    unitPrice: number
    selectedVariant?: string
  }[]
  deliveryAddress: string
  paymentMethod: string
  voucherId?: string
  voucherDiscount?: number
  voucherCode?: string
  subtotal: number
  tax: number
  shipping: number
}
