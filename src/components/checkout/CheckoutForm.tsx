"use client"

import type React from "react"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faCreditCard, faLock, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { faPaypal } from "@fortawesome/free-brands-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Textarea } from "../ui/textarea"
import type { PaymentMethod } from "@/types/payment"
import type { CheckoutData } from "@/types/order"

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => Promise<void>
  isLoading?: boolean
}

export function CheckoutForm({ onSubmit, isLoading = false }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutData>({
    deliveryAddress: "",
    paymentMethod: "paypal",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Checkout failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={(e) => setFormData((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
            placeholder="Enter your complete delivery address including street, city, state, and postal code"
            className="min-h-[100px] resize-none"
            required
          />
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCreditCard} className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "paypal", label: "PayPal", icon: faPaypal, description: "Pay securely with your PayPal account" },
            {
              id: "cash_on_delivery",
              label: "Cash on Delivery",
              icon: faMoneyBill,
              description: "Pay when your order is delivered",
            },
          ].map((method) => (
            <label
              key={method.id}
              className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethod === method.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={formData.paymentMethod === method.id}
                onChange={() => handlePaymentMethodChange(method.id as PaymentMethod)}
                className="mt-1 text-orange-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FontAwesomeIcon icon={method.icon} className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">{method.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
        disabled={isSubmitting || isLoading}
      >
        <FontAwesomeIcon icon={faLock} className="h-4 w-4 mr-2" />
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  )
}
