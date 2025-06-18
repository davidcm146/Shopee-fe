import type React from "react"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faCreditCard, faLock, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { CheckoutData } from "@/types/order"
import type { PaymentMethod } from "@/types/payment"
import { faPaypal } from "@fortawesome/free-brands-svg-icons"

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
          <textarea
            value={formData.deliveryAddress}
            onChange={(e) => setFormData((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
            placeholder="Enter your delivery address"
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
          {[
            { id: "paypal", label: "PayPal", icon: faPaypal },
            { id: "cash_on_delivery", label: "Cash on Delivery", icon: faMoneyBill },
          ].map((method) => (
            <label key={method.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={formData.paymentMethod === method.id}
                onChange={() => handlePaymentMethodChange(method.id as PaymentMethod)}
                className="text-orange-500"
              />
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={method.icon} className="h-5 w-5" />
                {method.label}
              </span>
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
