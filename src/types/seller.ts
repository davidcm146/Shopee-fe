

export interface ProductCategory {
  id: string
  name: string
  description?: string
  parentId?: string
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
  sku: string
  image?: string
}

export interface SellerProduct {
  id: string
  sellerId: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  categoryId: string
  stock: number
  sku: string
  status: "active" | "draft" | "out_of_stock" | "deleted"
  featured: boolean
  createdAt: Date
  updatedAt: Date
  variants?: ProductVariant[]
  specifications?: Record<string, string>
  tags?: string[]
  rating?: number
  reviewCount?: number
  salesCount?: number
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  categoryId: string
  stock: number
  sku: string
  status: "active" | "draft" | "out_of_stock"
  featured?: boolean
  variants?: Omit<ProductVariant, "id">[]
  specifications?: Record<string, string>
  tags?: string[]
}

export interface UpdateProductRequest {
  id: string
  name?: string
  description?: string
  price?: number
  originalPrice?: number
  images?: string[]
  categoryId?: string
  stock?: number
  sku?: string
  status?: "active" | "draft" | "out_of_stock"
  featured?: boolean
  variants?: Omit<ProductVariant, "id">[]
  specifications?: Record<string, string>
  tags?: string[]
}

export interface ProductFilters {
  status?: "active" | "draft" | "out_of_stock" | "deleted" | "all"
  category?: string
  search?: string
  sortBy?: "newest" | "oldest" | "price_high" | "price_low" | "bestselling"
  featured?: boolean
}

export interface SellerStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  productsByStatus: {
    active: number
    draft: number
    out_of_stock: number
    deleted: number
  }
}
