import { api } from "./api"
import type { Payment, PaymentMethod } from "../types/payment"

const BASE_URL = "/payments"

function parsePayment(raw: any): Payment {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
  }
}

// Create a new payment
export async function createPayment(payload: {
  orderId: string
  userId: string
  method: PaymentMethod
  amount: number
  provider?: string
}): Promise<Payment> {
  const finalPayload = {
    ...payload,
    provider: payload.provider ?? (payload.method === "paypal" ? "PayPal" : "Cash on Delivery"),
  }

  try {
    const res = await api.post(BASE_URL, finalPayload)
    return parsePayment(res.data)
  } catch (error) {
    throw new Error("Failed to create payment")
  }
}

// Get payment by orderId
export async function getPaymentByOrderId(orderId: string): Promise<Payment> {
  try {
    const res = await api.get(BASE_URL, { params: { orderId } })
    return parsePayment(res.data)
  } catch (error) {
    throw new Error("Failed to fetch payment")
  }
}

// Update payment status
export async function updatePaymentStatus(paymentId: string, status: Payment["status"]): Promise<Payment> {
  try {
    const res = await api.patch(`${BASE_URL}/${paymentId}/status`, { status })
    return parsePayment(res.data)
  } catch (error) {
    throw new Error("Failed to update payment status")
  }
}
