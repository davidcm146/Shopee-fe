import { api } from "./api"
import type { Product } from "../types/product"
import { publicApi } from "./publicApi"

export interface ProductQueryParams {
  page?: number
  limit?: number
  query?: string
  filters?: SearchFilters
}

export interface ProductApiResponse {
  products: Product[]
  currentPage: number
  totalPages: number
  totalItems: number
}

export interface SearchFilters {
  category: string
  rating: number
  priceRange: {
    min: number
    max: number
  }
  sortBy: "relevance" | "price_low" | "price_high" | "rating" | "newest"
}

const BASE_URL = "/products"

export async function fetchProducts({
  page,
  limit,
  query,
  filters,
}: ProductQueryParams = {}): Promise<ProductApiResponse> {
  const params: Record<string, string | number> = {}

  if (page) params.page = page
  if (limit) params.limit = limit
  if (query) params.query = query

  if (filters) {
    if (filters.category) params.category = filters.category
    if (filters.rating > 0) params.rating_gte = filters.rating
    if (filters.priceRange.min) params.price_gte = filters.priceRange.min
    if (filters.priceRange.max) params.price_lte = filters.priceRange.max

    switch (filters.sortBy) {
      case "price_low":
        params.sortBy = "price"
        params.order = "asc"
        break
      case "price_high":
        params.sortBy = "price"
        params.order = "desc"
        break
      case "rating":
        params.sortBy = "rating"
        params.order = "desc"
        break
      case "newest":
        params.sortBy = "createdAt"
        params.order = "desc"
        break
    }
  }

  const res = await publicApi.get<ProductApiResponse>(BASE_URL, { params })
  return res.data
}

export async function fetchRelatedProducts(
  categoryId: string,
  currentProductId: number,
  limit = 4
): Promise<Product[]> {
  const res = await publicApi.get<ProductApiResponse>(BASE_URL, {
    params: {
      category: categoryId,
      limit: limit + 1,
    },
  })

  const filtered = res.data.products.filter((p) => p.id !== currentProductId)
  return filtered.slice(0, limit)
}

export async function fetchProductById(productId: number): Promise<Product> {
  const res = await publicApi.get<Product>(`${BASE_URL}/${productId}`)
  return res.data
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  const res = await api.post<Product>(BASE_URL, data)
  return res.data
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product> {
  const res = await api.put<Product>(`${BASE_URL}/${id}`, data)
  return res.data
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`)
}
