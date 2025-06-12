export interface SearchFilters {
  category: string
  priceRange: {
    min: number
    max: number
  }
  rating: number
  sortBy: "relevance" | "price_low" | "price_high" | "rating" | "newest"
  inStock: boolean
}

export interface SearchParams {
  query: string
  filters: SearchFilters
  page: number
  limit: number
}

export interface SearchResult {
  products: any[]
  totalCount: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
