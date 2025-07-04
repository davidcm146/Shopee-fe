import type { Category } from "@/types/category"

export const categories: Category[] = [
  { id: "all", name: "All" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "household", name: "Household" },
  { id: "beauty", name: "Beauty" },
  { id: "sports", name: "Sports" },
]

export function getAllCategories(): Category[] {
  return categories
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id)
}

