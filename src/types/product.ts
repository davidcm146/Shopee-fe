export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviews: number
  images: string[]
  categoryId: string
  sellerId: string
  description?: string
  features?: string[]
  specifications?: Record<string, string>
  variants?: string[]
  stock?: number
  sold?: number
}