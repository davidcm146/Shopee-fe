import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import type { Order } from "@/types/order"

interface OrderHeaderProps {
  order: Order
  onStatusUpdated: (orderId: string) => void
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const formatDate = (input: Date | string) => {
    const date = typeof input === "string" ? new Date(input) : input
    return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/seller/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id.slice(-8)}</h1>
          <p className="text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}
