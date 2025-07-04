import { useState, useMemo, useEffect } from "react"
import { OrdersHeader } from "@/components/orders/OrdersHeader"
import { OrdersFilter } from "../components/orders/OrderFilter"
import { OrdersList } from "../components/orders/OrdersList"
import { getUserOrdersBySellerProduct } from "../data/order"
import type { Order, OrderItemStatus } from "../types/order"
import { OrdersPagination } from "@/components/orders/OrderPagination"

const ORDERS_PER_PAGE = 5

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<OrderItemStatus | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Load orders on component mount
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 500))
        const allOrders = await getUserOrdersBySellerProduct("guest-user")
        setOrders(allOrders)
      } catch (error) {
        console.error("Failed to load orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  // Filter orders based on item status (latest status of any item inside)
  const {
    paginatedOrders,
    totalPages,
    filteredLength
  } = useMemo(() => {
    let filtered: Order[]

    if (activeFilter === "all") {
      filtered = orders
    } else {
      filtered = orders.filter((order) =>
        order.items.some(
          (item) =>
            item.statusHistory[item.statusHistory.length - 1]?.status === activeFilter
        )
      )
    }

    const pages = Math.max(1, Math.ceil(filtered.length / ORDERS_PER_PAGE))
    const start = (currentPage - 1) * ORDERS_PER_PAGE
    const end = start + ORDERS_PER_PAGE

    return {
      paginatedOrders: filtered.slice(start, end),
      totalPages: pages,
      filteredLength: filtered.length,
    }

  }, [orders, activeFilter, currentPage])

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  const handleFilterChange = (status: OrderItemStatus | "all") => {
    setActiveFilter(status)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto py-6 space-y-6 px-8">
      <OrdersHeader totalOrders={orders.length} />

      <OrdersFilter onFilterChange={handleFilterChange} activeFilter={activeFilter} />

      <div className="space-y-4">
        <OrdersList orders={paginatedOrders} isLoading={isLoading} />

        {!isLoading && (
          <OrdersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredLength}
            itemsPerPage={ORDERS_PER_PAGE}
          />
        )}
      </div>
    </div>
  )
}
