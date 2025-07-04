"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag } from "lucide-react"
import type { Voucher } from "@/types/voucher"

interface OrderVouchersProps {
  vouchers: Voucher[]
}

export function OrderVouchers({ vouchers }: OrderVouchersProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (!vouchers || vouchers.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-green-600" />
          Applied Vouchers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
            >
              <div>
                <h4 className="font-medium text-green-800">{voucher.title}</h4>
                <p className="text-sm text-green-600">{voucher.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-800">
                  {voucher.type === "percentage" ? `-${voucher.discount}%` : `-${formatCurrency(voucher.discount)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
