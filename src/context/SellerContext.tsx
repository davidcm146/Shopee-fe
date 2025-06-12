"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "../types/product"
import { products as initialProducts } from "../data/product"

interface SellerState {
  products: Product[]
  isLoading: boolean
  error: string | null
}

type SellerAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }

const initialState: SellerState = {
  products: [],
  isLoading: false,
  error: null,
}

function sellerReducer(state: SellerState, action: SellerAction): SellerState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      }

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products],
      }

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) => (product.id === action.payload.id ? action.payload : product)),
      }

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

interface ProductFilters {
  categoryId?: string
  search?: string
  sortBy?: "newest" | "oldest" | "price_high" | "price_low" | "bestselling"
  minPrice?: number
  maxPrice?: number
}

interface SellerContextType {
  state: SellerState
  createProduct: (productData: Partial<Product>) => Promise<Product>
  updateProduct: (productData: Partial<Product> & { id: number }) => Promise<Product>
  deleteProduct: (productId: number) => Promise<void>
  getProducts: (filters?: ProductFilters) => Product[]
  getProductById: (productId: number) => Product | undefined
}

const SellerContext = createContext<SellerContextType | undefined>(undefined)

export function SellerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sellerReducer, initialState)

  // Load products on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("shopee-seller-products")
    if (savedProducts) {
      try {
        const products = JSON.parse(savedProducts)
        dispatch({ type: "SET_PRODUCTS", payload: products })
      } catch (error) {
        console.error("Failed to load products from localStorage:", error)
        // Fallback to initial products - FIX: Show all products for now
        dispatch({ type: "SET_PRODUCTS", payload: initialProducts })
      }
    } else {
      // Initialize with initial products - FIX: Show all products for now
      dispatch({ type: "SET_PRODUCTS", payload: initialProducts })
    }
  }, [])

  // Save products to localStorage whenever state changes
  useEffect(() => {
    if (state.products.length > 0) {
      localStorage.setItem("shopee-seller-products", JSON.stringify(state.products))
    }
  }, [state.products])

  const createProduct = async (productData: Partial<Product>): Promise<Product> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a new ID (in a real app, this would come from the backend)
      const maxId = state.products.reduce((max, product) => Math.max(max, product.id), 0)
      const newId = maxId + 1

      const newProduct: Product = {
        id: newId,
        name: productData.name || "Untitled Product",
        price: productData.price || 0,
        originalPrice: productData.originalPrice,
        discount:
          productData.originalPrice && productData.price
            ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
            : undefined,
        rating: 0,
        reviews: 0,
        images: productData.images || ["/placeholder.svg?height=500&width=500&text=Product+Image"],
        categoryId: productData.categoryId || "1",
        sellerId: "seller1", // In a real app, this would come from auth context
        description: productData.description || "",
        features: productData.features || [],
        specifications: productData.specifications || {},
        variants: productData.variants || [],
        stock: productData.stock || 0,
        sold: 0,
      }

      dispatch({ type: "ADD_PRODUCT", payload: newProduct })
      dispatch({ type: "SET_LOADING", payload: false })

      return newProduct
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create product" })
      throw error
    }
  }

  const updateProduct = async (productData: Partial<Product> & { id: number }): Promise<Product> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const existingProduct = state.products.find((p) => p.id === productData.id)
      if (!existingProduct) {
        throw new Error("Product not found")
      }

      // Calculate discount if both prices are provided
      let discount = existingProduct.discount
      if (productData.originalPrice && productData.price) {
        discount = Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
      }

      const updatedProduct: Product = {
        ...existingProduct,
        ...productData,
        discount,
      }

      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct })
      dispatch({ type: "SET_LOADING", payload: false })

      return updatedProduct
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update product" })
      throw error
    }
  }

  const deleteProduct = async (productId: number): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      dispatch({ type: "DELETE_PRODUCT", payload: productId })
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete product" })
      throw error
    }
  }

  const getProducts = (filters?: ProductFilters): Product[] => {
    let products = [...state.products]

    if (filters) {
      // Filter by category
      if (filters.categoryId) {
        products = products.filter((product) => product.categoryId === filters.categoryId)
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        products = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm)),
        )
      }

      // Filter by price range
      if (filters.minPrice !== undefined) {
        products = products.filter((product) => product.price >= filters.minPrice!)
      }
      if (filters.maxPrice !== undefined) {
        products = products.filter((product) => product.price <= filters.maxPrice!)
      }

      // Sort products
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price_high":
            products.sort((a, b) => b.price - a.price)
            break
          case "price_low":
            products.sort((a, b) => a.price - b.price)
            break
          case "bestselling":
            products.sort((a, b) => (b.sold || 0) - (a.sold || 0))
            break
        }
      }
    }

    return products
  }

  const getProductById = (productId: number): Product | undefined => {
    return state.products.find((product) => product.id === productId)
  }

  return (
    <SellerContext.Provider
      value={{
        state,
        createProduct,
        updateProduct,
        deleteProduct,
        getProducts,
        getProductById,
      }}
    >
      {children}
    </SellerContext.Provider>
  )
}

export function useSeller() {
  const context = useContext(SellerContext)
  if (context === undefined) {
    throw new Error("useSeller must be used within a SellerProvider")
  }
  return context
}
