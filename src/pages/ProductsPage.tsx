"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { SearchHeader } from "../components/products/SearchHeader"
import { SearchFilters } from "../components/products/SearchFilters"
import { SortDropdown } from "../components/products/SortDropdown"
import { ProductGrid } from "../components/products/ProductGrid"
import { Pagination } from "../components/products/Pagination"
import { useSearch } from "../hooks/useSearch"
import type { SearchFilters as SearchFiltersType } from "../types/search"

export function ProductsPage() {
  const [searchParams] = useSearchParams()
  const { searchResult, isLoading, searchProducts, defaultFilters } = useSearch()
  const [filters, setFilters] = useState<SearchFiltersType>(defaultFilters)
  const [currentPage, setCurrentPage] = useState(1)

  const query = searchParams.get("q") || ""

  useEffect(() => {
    const searchParams = {
      query,
      filters,
      page: currentPage,
      limit: 12,
    }
    searchProducts(searchParams)
  }, [query, filters, currentPage])

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleSortChange = (sortBy: SearchFiltersType["sortBy"]) => {
    setFilters({ ...filters, sortBy })
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setFilters(defaultFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container py-6 max-w-7xl mx-auto">
      <SearchHeader query={query} totalResults={searchResult.totalCount} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <SearchFilters filters={filters} onFiltersChange={handleFiltersChange} onReset={handleResetFilters} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Sort and Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {searchResult.products.length} of {searchResult.totalCount} results
              {currentPage > 1 && ` (Page ${currentPage} of ${searchResult.totalPages})`}
            </p>
            <SortDropdown sortBy={filters.sortBy} onSortChange={handleSortChange} />
          </div>

          {/* Product Grid */}
          <ProductGrid products={searchResult.products} isLoading={isLoading} />

          {/* Pagination */}
          <Pagination
            currentPage={searchResult.currentPage}
            totalPages={searchResult.totalPages}
            hasNextPage={searchResult.hasNextPage}
            hasPreviousPage={searchResult.hasPreviousPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
