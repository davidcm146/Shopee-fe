"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User } from "lucide-react"

interface CustomerInfoProps {
  buyerId: string
  createdAt: Date
}

export function CustomerInfo({ buyerId, createdAt }: CustomerInfoProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Buyer ID</p>
          <p className="font-medium">{buyerId}</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium text-muted-foreground">Order Date</p>
          <p className="font-medium">{formatDate(createdAt)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
