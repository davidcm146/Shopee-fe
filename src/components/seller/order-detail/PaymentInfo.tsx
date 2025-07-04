"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard } from "lucide-react"

interface PaymentInfoProps {
  paymentId?: string
}

export function PaymentInfo({ paymentId }: PaymentInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-purple-600" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {paymentId && (
          <>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payment ID</p>
              <p className="font-medium">{paymentId}</p>
            </div>
            <Separator />
          </>
        )}
        <div>
          <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
          <Badge variant="outline" className="mt-1">
            {paymentId ? "Paid" : "Pending"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
