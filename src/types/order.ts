import type{ Voucher } from "./voucher"

export interface Order {
  id: string
  buyerId: string
  paymentId?: string
  deliveryAddress: string
  totalPrice: number
  subtotal: number
  vouchers: Voucher[]
  createdAt: Date
  items: OrderItem[]
}

export interface OrderItem {
  productId: string
  sellerId: string
  quantity: number
  unitPrice: number
  createdAt: Date | string
  statusHistory: OrderItemStatusHistory[]
}

export interface OrderItemStatusHistory {
  status: OrderItemStatus
  updatedAt: Date | string
  notes?: string
}

export type OrderItemStatus = "pending" | "confirmed" | "packed" | "shipping" | "delivered" | "cancelled"

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
