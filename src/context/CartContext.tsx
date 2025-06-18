"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "../types/product"
import type { Cart, CartItem } from "../types/cart"

interface CartState {
  cart: Cart | null
  isLoading: boolean
  error: string | null
}

type CartAction =
  | { type: "INITIALIZE_CART"; payload: Cart }
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number; selectedVariant?: string } }
  | { type: "REMOVE_FROM_CART"; payload: { cartItemId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { cartItemId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
}

// Simple ID generation function
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function calculateTotalAmount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INITIALIZE_CART":
      return {
        ...state,
        cart: action.payload,
        isLoading: false,
      }

    case "ADD_TO_CART": {
      const { product, quantity, selectedVariant } = action.payload
      const now = new Date()

      // If no cart exists, create a new one
      if (!state.cart) {
        const newCart: Cart = {
          cartId: generateId(),
          userId: "guest-user", // This would come from auth context in a real app
          totalAmount: product.price * quantity,
          updatedAt: now,
          createdAt: now,
          items: [
            {
              id: generateId(),
              productId: product.id,
              unitPrice: product.price,
              quantity,
              createdAt: now,
              selectedVariant,
              updatedAt: new Date("2025-06-15")
            },
          ],
        }
        return {
          ...state,
          cart: newCart,
        }
      }

      // Check if the product already exists in the cart
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.productId === product.id && item.selectedVariant === selectedVariant,
      )

      let updatedItems: CartItem[]

      if (existingItemIndex > -1) {
        // Update existing item
        updatedItems = state.cart.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + quantity, product } : item,
        )
      } else {
        // Add new item
        const newItem: CartItem = {
          id: state.cart.cartId,
          productId: product.id,
          unitPrice: product.price,
          quantity,
          createdAt: now,
          selectedVariant,
          updatedAt: undefined
        }
        updatedItems = [...state.cart.items, newItem]
      }

      // Calculate new total
      const totalAmount = calculateTotalAmount(updatedItems)

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          totalAmount,
          updatedAt: now,
        },
      }
    }

    case "REMOVE_FROM_CART": {
      if (!state.cart) return state

      const { cartItemId } = action.payload
      const updatedItems = state.cart.items.filter((item) => item.id !== cartItemId)
      const totalAmount = calculateTotalAmount(updatedItems)

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          totalAmount,
          updatedAt: new Date(),
        },
      }
    }

    case "UPDATE_QUANTITY": {
      if (!state.cart) return state

      const { cartItemId, quantity } = action.payload

      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_FROM_CART", payload: { cartItemId } })
      }

      const updatedItems = state.cart.items.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item,
      )

      const totalAmount = calculateTotalAmount(updatedItems)

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          totalAmount,
          updatedAt: new Date(),
        },
      }
    }

    case "CLEAR_CART":
      return {
        ...state,
        cart: null,
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

interface CartContextType {
  state: CartState
  addToCart: (product: Product, quantity: number, selectedVariant?: string) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getItemQuantity: (productId: number, selectedVariant?: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopee-cart")
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)

        // Convert string dates back to Date objects
        if (cartData) {
          cartData.createdAt = new Date(cartData.createdAt)
          cartData.updatedAt = new Date(cartData.updatedAt)

          if (cartData.items) {
            cartData.items = cartData.items.map((item: any) => ({
              ...item,
              createdAt: new Date(item.createdAt),
            }))
          }
        }

        dispatch({ type: "INITIALIZE_CART", payload: cartData })
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    if (state.cart) {
      localStorage.setItem("shopee-cart", JSON.stringify(state.cart))
    } else {
      localStorage.removeItem("shopee-cart")
    }
  }, [state.cart])

  const addToCart = (product: Product, quantity: number, selectedVariant?: string) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity, selectedVariant } })
  }

  const removeFromCart = (cartItemId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { cartItemId } })
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { cartItemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getTotalItems = (): number => {
    if (!state.cart) return 0
    return state.cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getItemQuantity = (productId: number, selectedVariant?: string): number => {
    if (!state.cart) return 0
    const item = state.cart.items.find(
      (item) => item.productId === productId && item.selectedVariant === selectedVariant,
    )
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
