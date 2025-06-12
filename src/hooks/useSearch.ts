"use client"

import { useState } from "react"
import { getAllProducts } from "../data/product"
import type { SearchParams, SearchResult, SearchFilters } from "../types/search"

const defaultFilters: SearchFilters = {
  category: "all",
  priceRange: { min: 0, max: 1000 },
  rating: 0,
  sortBy: "relevance",
  inStock: true,
}

export function useSearch() {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    products: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const searchProducts = async (params: SearchParams) => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      let products = getAllProducts()

      // Filter by search query
      if (params.query.trim()) {
        const query = params.query.toLowerCase()
        products = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description?.toLowerCase().includes(query) ||
            product.features?.some((feature) => feature.toLowerCase().includes(query)),
        )
      }

      // Filter by category
      if (params.filters.category !== "all") {
        products = products.filter((product) => product.categoryId === params.filters.category)
      }

      // Filter by price range
      products = products.filter(
        (product) => product.price >= params.filters.priceRange.min && product.price <= params.filters.priceRange.max,
      )

      // Filter by rating
      if (params.filters.rating > 0) {
        products = products.filter((product) => product.rating >= params.filters.rating)
      }

      // Filter by stock
      if (params.filters.inStock) {
        products = products.filter((product) => (product.stock || 0) > 0)
      }

      // Sort products
      switch (params.filters.sortBy) {
        case "price_low":
          products.sort((a, b) => a.price - b.price)
          break
        case "price_high":
          products.sort((a, b) => b.price - a.price)
          break
        case "rating":
          products.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          products.sort((a, b) => b.id - a.id)
          break
        default:
          // relevance - keep original order for search results
          break
      }

      // Pagination
      const totalCount = products.length
      const totalPages = Math.ceil(totalCount / params.limit)
      const startIndex = (params.page - 1) * params.limit
      const endIndex = startIndex + params.limit
      const paginatedProducts = products.slice(startIndex, endIndex)

      const result: SearchResult = {
        products: paginatedProducts,
        totalCount,
        totalPages,
        currentPage: params.page,
        hasNextPage: params.page < totalPages,
        hasPreviousPage: params.page > 1,
      }

      setSearchResult(result)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    searchResult,
    isLoading,
    searchProducts,
    defaultFilters,
  }
}
