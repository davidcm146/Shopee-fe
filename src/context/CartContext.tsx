import type React from "react"
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react"
import type { Product } from "../types/product"
import type { Cart, CartItem } from "../types/cart"

interface CartState {
  cart: Cart | null
  selectedItems: string[] // Array of selected cart item productIds
  isLoading: boolean
  error: string | null
}

type CartAction =
  | { type: "INITIALIZE_CART"; payload: Cart }
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "TOGGLE_ITEM_SELECTION"; payload: { productId: string } }
  | { type: "SELECT_ALL_ITEMS" }
  | { type: "DESELECT_ALL_ITEMS" }
  | { type: "SET_SELECTED_ITEMS"; payload: string[] }
  | { type: "INITIALIZE_SELECTED_ITEMS"; payload: string[] }

const initialState: CartState = {
  cart: null,
  selectedItems: [],
  isLoading: false,
  error: null,
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

    case "INITIALIZE_SELECTED_ITEMS":
      return {
        ...state,
        selectedItems: action.payload,
      }

    case "ADD_TO_CART": {
      const { product, quantity } = action.payload
      const now = new Date()

      if (!state.cart) {
        const newCart: Cart = {
          id: Date.now().toString(),
          userId: "guest-user",
          totalAmount: product.price * quantity,
          createdAt: now,
          updatedAt: now,
          items: [
            {
              productId: product.id,
              unitPrice: product.price,
              quantity,
              createdAt: now,
            },
          ],
        }
        return {
          ...state,
          cart: newCart,
          selectedItems: [product.id],
        }
      }

      const existingIndex = state.cart.items.findIndex(
        (item) => item.productId === product.id,
      )

      let updatedItems: CartItem[]
      const updatedSelectedItems = [...state.selectedItems]

      if (existingIndex > -1) {
        updatedItems = state.cart.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity, updatedAt: now }
            : item,
        )
      } else {
        updatedItems = [
          ...state.cart.items,
          {
            productId: product.id,
            unitPrice: product.price,
            quantity,
            createdAt: now,
          },
        ]
        updatedSelectedItems.push(product.id)
      }

      const totalAmount = calculateTotalAmount(updatedItems)

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          totalAmount,
          updatedAt: now,
        },
        selectedItems: updatedSelectedItems,
      }
    }

    case "REMOVE_FROM_CART": {
      if (!state.cart) return state

      const { productId } = action.payload
      const updatedItems = state.cart.items.filter((item) => item.productId !== productId)
      const totalAmount = calculateTotalAmount(updatedItems)
      const updatedSelectedItems = state.selectedItems.filter((id) => id !== productId)

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          totalAmount,
          updatedAt: new Date(),
        },
        selectedItems: updatedSelectedItems,
      }
    }

    case "UPDATE_QUANTITY": {
      if (!state.cart) return state

      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_FROM_CART", payload: { productId } })
      }

      const updatedItems = state.cart.items.map((item) =>
        item.productId === productId ? { ...item, quantity, updatedAt: new Date() } : item,
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
        selectedItems: [],
      }

    case "TOGGLE_ITEM_SELECTION": {
      const { productId } = action.payload
      const isSelected = state.selectedItems.includes(productId)
      const updated = isSelected
        ? state.selectedItems.filter((id) => id !== productId)
        : [...state.selectedItems, productId]
      return { ...state, selectedItems: updated }
    }

    case "SELECT_ALL_ITEMS": {
      if (!state.cart) return state
      const allIds = state.cart.items.map((item) => item.productId)
      return { ...state, selectedItems: allIds }
    }

    case "DESELECT_ALL_ITEMS":
      return { ...state, selectedItems: [] }

    case "SET_SELECTED_ITEMS":
      return { ...state, selectedItems: action.payload }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false }

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getItemQuantity: (productId: string) => number
  toggleItemSelection: (productId: string) => void
  selectAllItems: () => void
  deselectAllItems: () => void
  setSelectedItems: (productIds: string[]) => void
  getSelectedItems: () => CartItem[]
  getSelectedItemsCount: () => number
  getSelectedItemsTotal: () => number
  isItemSelected: (productId: string) => boolean
  isAllItemsSelected: () => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    const savedCart = localStorage.getItem("shopee-cart")
    const savedSelectedItems = localStorage.getItem("shopee-cart-selected")

    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)

        cartData.createdAt = new Date(cartData.createdAt)
        cartData.updatedAt = new Date(cartData.updatedAt)

        if (cartData.items) {
          cartData.items = cartData.items.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
          }))
        }

        dispatch({ type: "INITIALIZE_CART", payload: cartData })

        const selectedItemsData = savedSelectedItems ? JSON.parse(savedSelectedItems) : []
        const validSelectedItems = selectedItemsData.filter((id: string) =>
          cartData.items?.some((item: CartItem) => item.productId === id),
        )
        dispatch({ type: "INITIALIZE_SELECTED_ITEMS", payload: validSelectedItems })
      } catch (error) {
        console.error("Failed to load cart or selected items from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (!isInitialized.current) return
    if (state.cart) {
      localStorage.setItem("shopee-cart", JSON.stringify(state.cart))
    } else {
      localStorage.removeItem("shopee-cart")
    }
  }, [state.cart])

  useEffect(() => {
    if (!isInitialized.current) return
    if (state.selectedItems.length > 0) {
      localStorage.setItem("shopee-cart-selected", JSON.stringify(state.selectedItems))
    } else {
      localStorage.removeItem("shopee-cart-selected")
    }
  }, [state.selectedItems])

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getTotalItems = (): number => {
    if (!state.cart) return 0
    return state.cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getItemQuantity = (productId: string): number => {
    if (!state.cart) return 0
    const item = state.cart.items.find((item) => item.productId === productId)
    return item ? item.quantity : 0
  }

  const toggleItemSelection = (productId: string) => {
    dispatch({ type: "TOGGLE_ITEM_SELECTION", payload: { productId } })
  }

  const selectAllItems = () => {
    dispatch({ type: "SELECT_ALL_ITEMS" })
  }

  const deselectAllItems = () => {
    dispatch({ type: "DESELECT_ALL_ITEMS" })
  }

  const setSelectedItems = (productIds: string[]) => {
    dispatch({ type: "SET_SELECTED_ITEMS", payload: productIds })
  }

  const getSelectedItems = (): CartItem[] => {
    if (!state.cart?.items) return []
    return state.cart.items.filter((item) => state.selectedItems.includes(item.productId))
  }

  const getSelectedItemsCount = (): number => {
    return getSelectedItems().reduce((total, item) => total + item.quantity, 0)
  }

  const getSelectedItemsTotal = (): number => {
    return getSelectedItems().reduce((total, item) => total + item.unitPrice * item.quantity, 0)
  }

  const isItemSelected = (productId: string): boolean => {
    return state.selectedItems.includes(productId)
  }

  const isAllItemsSelected = (): boolean => {
    if (!state.cart?.items || state.cart.items.length === 0) return false
    return state.cart.items.every((item) => state.selectedItems.includes(item.productId))
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
        toggleItemSelection,
        selectAllItems,
        deselectAllItems,
        setSelectedItems,
        getSelectedItems,
        getSelectedItemsCount,
        getSelectedItemsTotal,
        isItemSelected,
        isAllItemsSelected,
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
