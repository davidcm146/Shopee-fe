export interface Product {
  id: string
  name: string
  price: number
  images: string[]
  ratings?: number
  category: "fashion" | "electronics" | "household"| "sports" | "beauty" | string
  sellerId: string
  isDeleted?: boolean
  description?: string
  features?: string[]
  stock: number
  createdAt?: Date | string
  updatedAt?: Date | string
}