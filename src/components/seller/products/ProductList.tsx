"use client"

import type React from "react"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faSearch, faStar, faTrash, faEye, faEdit } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import type { Product } from "../../../types/product"

interface ProductFilters {
  categoryId?: string
  search?: string
  sortBy?: "newest" | "oldest" | "price_high" | "price_low" | "bestselling"
  minPrice?: number
  maxPrice?: number
}

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onView: (product: Product) => void
  onCreateNew: () => void
  onDelete: (productId: number) => void
}

export function ProductList({ products, onEdit, onView, onCreateNew, onDelete }: ProductListProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    sortBy: "price_high",
    search: "",
  })
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories from products
  const categories = Array.from(new Set(products.map((product) => product.categoryId)))

  // Filter and sort products
  const getFilteredProducts = (): Product[] => {
    let filteredProducts = [...products]

    // Filter by category
    if (filters.categoryId) {
      filteredProducts = filteredProducts.filter((product) => product.categoryId === filters.categoryId)
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          (product.description && product.description.toLowerCase().includes(searchTerm)),
      )
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice!)
    }

    // Sort products
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price_high":
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case "price_low":
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case "bestselling":
          filteredProducts.sort((a, b) => (b.sold || 0) - (a.sold || 0))
          break
      }
    }

    return filteredProducts
  }

  const filteredProducts = getFilteredProducts()

  // Handle delete product
  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(productId)
      try {
        await onDelete(productId)
      } catch (error) {
        console.error("Failed to delete product:", error)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  // Filter handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, categoryId: e.target.value || undefined }))
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value as ProductFilters["sortBy"] }))
  }

  const handlePriceChange = (min?: number, max?: number) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }))
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle>Products ({filteredProducts.length})</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <FontAwesomeIcon icon={faFilter} className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button onClick={onCreateNew} className="bg-orange-500 hover:bg-orange-600">
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                value={filters.search}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filters.sortBy || "price_high"}
                onChange={handleSortChange}
                className="px-3 py-2 border rounded-md text-sm bg-background"
              >
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
                <option value="bestselling">Best Selling</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-md">
              <div className="w-full sm:w-64">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={filters.categoryId || ""}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                >
                  <option value="">All Categories</option>
                  {categories.map((categoryId) => (
                    <option key={categoryId} value={categoryId}>
                      Category {categoryId}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-64">
                <label className="block text-sm font-medium mb-1">Price Range</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ""}
                    onChange={(e) =>
                      handlePriceChange(e.target.value ? Number(e.target.value) : undefined, filters.maxPrice)
                    }
                    className="w-full"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ""}
                    onChange={(e) =>
                      handlePriceChange(filters.minPrice, e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No products found. Try adjusting your filters or add a new product.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">Category {product.categoryId}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">${product.price.toFixed(2)}</p>
                        {product.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-medium ${
                          !product.stock ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : ""
                        }`}
                      >
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-yellow-500" />
                        <span>{product.rating || 0}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews || 0})</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={() => onView(product)}
                        >
                          <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => onEdit(product)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={isDeleting === product.id}
                        >
                          <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
