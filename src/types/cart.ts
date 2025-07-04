export interface Cart {
  id: string
  userId: string
  totalAmount: number
  updatedAt?: Date
  createdAt: Date
  items: CartItem[]
}

export interface CartItem {
  productId: string // Using number to match our existing product IDs
  unitPrice: number
  quantity: number
  statusHistory?: CartItemStatus[]
  createdAt: Date | string
  updatedAt?: Date | string
}

export type CartItemStatus = "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled"

