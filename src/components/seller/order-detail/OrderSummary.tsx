"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Receipt } from "lucide-react"
import type { Voucher } from "@/types/voucher"

interface OrderSummaryProps {
  subtotal: number
  totalPrice: number
  vouchers?: Voucher[]
}

export function OrderSummary({ subtotal, totalPrice, vouchers }: OrderSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-green-600" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {vouchers && vouchers.length > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Voucher Discount</span>
            <span>
              -
              {formatCurrency(
                vouchers.reduce((total, voucher) => {
                  return total + (voucher.type === "fixed_amount" ? voucher.discount : 0)
                }, 0),
              )}
            </span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
