"use client"

import type React from "react"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faCreditCard, faLock } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { CheckoutData } from "../../types/order"

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => Promise<void>
  isLoading?: boolean
}

export function CheckoutForm({ onSubmit, isLoading = false }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutData>({
    deliveryAddress: "",
    paymentMethod: "credit_card",
    paymentDetails: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
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
          <textarea
            value={formData.deliveryAddress}
            onChange={(e) => setFormData((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
            placeholder="Enter your complete delivery address"
            className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={formData.paymentMethod === "credit_card"}
                onChange={(e) => setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }))}
                className="text-orange-500"
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={(e) => setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }))}
                className="text-orange-500"
              />
              <span>PayPal</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={formData.paymentMethod === "cash_on_delivery"}
                onChange={(e) => setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }))}
                className="text-orange-500"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          {/* Credit Card Details */}
          {formData.paymentMethod === "credit_card" && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <Input
                  type="text"
                  value={formData.paymentDetails?.cardholderName || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentDetails: { ...prev.paymentDetails, cardholderName: e.target.value },
                    }))
                  }
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <Input
                  type="text"
                  value={formData.paymentDetails?.cardNumber || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentDetails: { ...prev.paymentDetails, cardNumber: e.target.value },
                    }))
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <Input
                    type="text"
                    value={formData.paymentDetails?.expiryDate || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        paymentDetails: { ...prev.paymentDetails, expiryDate: e.target.value },
                      }))
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <Input
                    type="text"
                    value={formData.paymentDetails?.cvv || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        paymentDetails: { ...prev.paymentDetails, cvv: e.target.value },
                      }))
                    }
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          )}
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
