"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface DeliveryInfoProps {
  deliveryAddress: string
}

export function DeliveryInfo({ deliveryAddress }: DeliveryInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-600" />
          Delivery Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Delivery Address</p>
          <p className="font-medium">{deliveryAddress}</p>
        </div>
      </CardContent>
    </Card>
  )
}
