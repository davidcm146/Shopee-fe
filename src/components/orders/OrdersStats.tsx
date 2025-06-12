import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag, faTruck, faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent } from "../ui/card"
import type { Order } from "../../types/order"

interface OrdersStatsProps {
  orders: Order[]
}

export function OrdersStats({ orders }: OrdersStatsProps) {
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: faShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "In Transit",
      value: orders.filter((order) => order.status === "shipped").length,
      icon: faTruck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Delivered",
      value: orders.filter((order) => order.status === "delivered").length,
      icon: faCheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Cancelled",
      value: orders.filter((order) => order.status === "cancelled").length,
      icon: faTimes,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} flex-shrink-0`}>
                <FontAwesomeIcon icon={stat.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground truncate">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
