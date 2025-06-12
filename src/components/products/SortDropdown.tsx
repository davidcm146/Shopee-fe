"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSort } from "@fortawesome/free-solid-svg-icons"
import type { SearchFilters } from "../../types/search"

interface SortDropdownProps {
  sortBy: SearchFilters["sortBy"]
  onSortChange: (sortBy: SearchFilters["sortBy"]) => void
}

export function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
  ] as const

  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faSort} className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SearchFilters["sortBy"])}
        className="px-3 py-1 border rounded-md text-sm bg-background"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
