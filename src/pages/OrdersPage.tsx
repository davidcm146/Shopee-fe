import { useState, useMemo } from "react"
import { OrdersHeader } from "../components/orders/OrdersHeader"
import { OrdersStats } from "../components/orders/OrdersStats"
import { OrdersFilter } from "../components/orders/OrderFilter"
import { OrdersList } from "../components/orders/OrdersList"
import { useOrder } from "../context/OrderContext"
import type { OrderStatus } from "../types/order"

export function OrdersPage() {
  const { getUserOrders, state } = useOrder()
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all")

  // In a real app, this would come from auth context
  const userId = "guest-user"
  const userOrders = getUserOrders(userId)

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") {
      return userOrders
    }
    return userOrders.filter((order) => order.status === activeFilter)
  }, [userOrders, activeFilter])

  return (
    <div className="container py-6 mx-auto max-w-6xl">
      <OrdersHeader totalOrders={userOrders.length} />
      <OrdersStats orders={userOrders} />
      <OrdersFilter onFilterChange={setActiveFilter} activeFilter={activeFilter} />
      <OrdersList orders={filteredOrders} isLoading={state.isLoading} />
    </div>
  )
}
