export interface Cart {
  cartId: string
  userId: string
  totalAmount: number
  updatedAt: Date
  createdAt: Date
  items: CartItem[]
}

export interface CartItem {
  cartId: string
  cartItemId: string
  userId: string
  productId: number // Using number to match our existing product IDs
  unitPrice: number
  quantity: number
  createdAt: Date

  // Additional fields for UI display (not in DB schema)
  product?: any // Will be populated from products data
  selectedVariant?: string
}
