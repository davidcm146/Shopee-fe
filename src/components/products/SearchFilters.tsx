"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faStar } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { getAllCategories } from "../../data/category"
import type { SearchFilters } from "../../types/search"

interface SearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onReset: () => void
}

export function SearchFilters({ filters, onFiltersChange, onReset }: SearchFiltersProps) {
  const categories = getAllCategories()

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handlePriceRangeChange = (key: "min" | "max", value: number) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [key]: value,
      },
    })
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFilter} className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-medium mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={filters.category === category.id}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="text-orange-500"
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Min Price</label>
              <input
                type="number"
                min="0"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceRangeChange("min", Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Max Price</label>
              <input
                type="number"
                min="0"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceRangeChange("max", Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="1000"
              />
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-medium mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1, 0].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => handleFilterChange("rating", Number(e.target.value))}
                  className="text-orange-500"
                />
                <div className="flex items-center gap-1">
                  {rating > 0 ? (
                    <>
                      {[...Array(rating)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="h-3 w-3 text-yellow-400" />
                      ))}
                      <span className="text-sm">& up</span>
                    </>
                  ) : (
                    <span className="text-sm">All ratings</span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Stock Filter */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange("inStock", e.target.checked)}
              className="text-orange-500"
            />
            <span className="text-sm">In Stock Only</span>
          </label>
        </div>

        {/* Reset Button */}
        <Button variant="outline" onClick={onReset} className="w-full">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
