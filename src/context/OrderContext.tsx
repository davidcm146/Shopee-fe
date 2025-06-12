"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Order, OrderItem, OrderStatus, CreateOrderRequest } from "../types/order"

interface OrderState {
  orders: Order[]
  isLoading: boolean
  error: string | null
}

type OrderAction =
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { orderId: string; status: OrderStatus } }
  | { type: "CANCEL_ORDER"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
}

// Simple ID generation function
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
      }

    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      }

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId ? { ...order, status: action.payload.status } : order,
        ),
      }

    case "CANCEL_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload ? { ...order, status: "cancelled" } : order,
        ),
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

interface OrderContextType {
  state: OrderState
  createOrder: (orderData: CreateOrderRequest) => Promise<Order>
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>
  cancelOrder: (orderId: string) => Promise<void>
  getOrderById: (orderId: string) => Order | undefined
  getUserOrders: (userId: string) => Order[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState)

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("shopee-orders")
    if (savedOrders) {
      try {
        const ordersData = JSON.parse(savedOrders)
        // Convert string dates back to Date objects
        const orders = ordersData.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          items: order.items.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          })),
        }))
        dispatch({ type: "SET_ORDERS", payload: orders })
      } catch (error) {
        console.error("Failed to load orders from localStorage:", error)
      }
    }
  }, [])

  // Save orders to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("shopee-orders", JSON.stringify(state.orders))
  }, [state.orders])

  const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const now = new Date()
      const orderId = generateId()
      const paymentId = generateId()

      // Create order items
      const orderItems: OrderItem[] = orderData.items.map((item) => ({
        id: generateId(),
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        createdAt: now,
        selectedVariant: item.selectedVariant,
      }))

      // Calculate total price with voucher discount
      const subtotal = orderData.subtotal
      const tax = orderData.tax
      const shipping = orderData.shipping
      const voucherDiscount = orderData.voucherDiscount || 0
      const totalPrice = subtotal + tax + shipping - voucherDiscount

      // Create order
      const newOrder: Order = {
        orderId,
        buyerId: orderData.buyerId,
        sellerId: orderData.sellerId,
        paymentId,
        deliveryAddress: orderData.deliveryAddress,
        status: "pending",
        totalPrice,
        subtotal,
        tax,
        shipping,
        voucherDiscount,
        voucherId: orderData.voucherId,
        voucherCode: orderData.voucherCode,
        createdAt: now,
        items: orderItems,
      }

      dispatch({ type: "ADD_ORDER", payload: newOrder })
      dispatch({ type: "SET_LOADING", payload: false })

      return newOrder
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create order" })
      throw error
    }
  }

  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status } })
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update order status" })
      throw error
    }
  }

  const cancelOrder = async (orderId: string): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      dispatch({ type: "CANCEL_ORDER", payload: orderId })
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to cancel order" })
      throw error
    }
  }

  const getOrderById = (orderId: string): Order | undefined => {
    return state.orders.find((order) => order.orderId === orderId)
  }

  const getUserOrders = (userId: string): Order[] => {
    return state.orders.filter((order) => order.buyerId === userId)
  }

  return (
    <OrderContext.Provider
      value={{
        state,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        getOrderById,
        getUserOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
