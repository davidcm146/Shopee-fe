export interface Payment {
  _id: string
  orderId: string
  userId: string
  provider: string
  method: "credit_card" | "paypal" | "cash_on_delivery"
  amount: number
  status: "PENDING" | "PAID" | "FAILED"
  createdAt: Date
}

export type PaymentMethod = "credit_card" | "paypal" | "cash_on_delivery"

export interface CreditCardPaymentInput {
  cardholderName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}
