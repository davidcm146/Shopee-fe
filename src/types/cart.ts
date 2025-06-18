export interface Cart {
  cartId: string
  userId: string
  totalAmount: number
  updatedAt?: Date
  createdAt: Date
  items: CartItem[]
}

export interface CartItem {
  id: string
  productId: number // Using number to match our existing product IDs
  unitPrice: number
  quantity: number
  createdAt: Date
  updatedAt?: Date
  selectedVariant?: string
}
