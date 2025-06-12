import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface OrderSummaryProps {
  totalItems: number
  totalAmount: number
}

export function OrderSummary({ totalItems, totalAmount }: OrderSummaryProps) {
  const safeTotal = totalAmount || 0
  const tax = safeTotal * 0.08
  const finalTotal = safeTotal + tax

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-20">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal ({totalItems} items)</span>
            <span>${safeTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-500">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-6 mb-3">Proceed to Checkout</Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
