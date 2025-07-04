import type { Category } from "@/types/category"
import { publicApi } from "./publicApi"

export class CategoryService {
  private static readonly BASE_PATH = "/categories"

  /**
   * Get all categories
   */
  static async getAllCategories(): Promise<Category[]> {
    try {
      const response = await publicApi.get(this.BASE_PATH)
      return response.data
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw new Error("Failed to fetch categories")
    }
  }

  /**
   * Get a single category by ID
   */
  static async getCategoryById(id: string): Promise<Category> {
    try {
      const response = await publicApi.get(`${this.BASE_PATH}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error)
      throw new Error("Failed to fetch category details")
    }
  }
}
