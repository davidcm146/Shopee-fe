import { OrderItem } from "../orders/OrderItems"
import { EmptyOrders } from "../orders/EmptyOrders"
import type { Order } from "../../types/order"

interface OrdersListProps {
  orders: Order[]
  isLoading?: boolean
}

export function OrdersList({ orders, isLoading = false }: OrdersListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return <EmptyOrders />
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  )
}
