"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import type { OrderStatus } from "../../types/order"

interface OrdersFilterProps {
  onFilterChange: (status: OrderStatus | "all") => void
  activeFilter: OrderStatus | "all"
}

export function OrdersFilter({ onFilterChange, activeFilter }: OrdersFilterProps) {
  const filters: { label: string; value: OrderStatus | "all" }[] = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Packed", value: "packed" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
  ]

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
          <span className="font-medium">Filter Orders</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter.value)}
              className={
                activeFilter === filter.value
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "hover:bg-orange-50 hover:text-orange-600"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
