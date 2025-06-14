import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { Order } from "../../types/order"

interface OrderSummarySidebarProps {
  order: Order
}

export function OrderSummarySidebar({ order }: OrderSummarySidebarProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Order ID</span>
            <span className="font-medium">{order.orderId.slice(-8)}</span>
          </div>
          <div className="flex justify-between">
            <span>Order Date</span>
            <span className="font-medium">{order.createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment ID</span>
            <span className="font-medium">{order.paymentId.slice(-8)}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Shipping</span>
            <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>

          {/* Voucher Discount */}
          {order.voucherDiscount && order.voucherDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span className="text-sm">Voucher Discount {order.voucherCode && `(${order.voucherCode})`}</span>
              <span>-${order.voucherDiscount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-orange-500">${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            <FontAwesomeIcon icon={faDownload} className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
          <Link to="/orders">
            <Button variant="outline" className="w-full">
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
