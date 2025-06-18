import type { Voucher } from "./voucher"

export interface Order {
  id: string
  buyerId: string
  paymentId?: string
  deliveryAddress: string
  status: OrderStatus
  totalPrice: number
  subtotal: number
  shipping: number
  createdAt: Date
  vouchers: Voucher[]
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  productId: number
  quantity: number
  unitPrice: number
  createdAt: Date
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
