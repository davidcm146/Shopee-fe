"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { ConfirmationHeader } from "../components/order/ConfirmationHeader"
import { OrderDetailsCard } from "../components/order/OrderDetailCard"
import { ConfirmationActions } from "../components/order/ConfirmationActions"
import { OrderNotFound } from "../components/order/OrderNotFound"
import { getOrderById } from "../data/order"
import { useCart } from "@/context/CartContext"

export function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const { clearCart } = useCart()

  const order = orderId ? getOrderById(orderId) : null

  useEffect(() => {
    if (order) {
      clearCart()
    }
  }, [order])

  if (!order) {
    return <OrderNotFound />
  }

  return (
    <div className="container py-10 max-w-2xl mx-auto">
      <ConfirmationHeader />
      <OrderDetailsCard order={order} />
      <ConfirmationActions />
    </div>
  )
}
