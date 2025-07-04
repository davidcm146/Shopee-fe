import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import type { Order } from "../../types/order"

interface OrderHeaderProps {
  order: Order
}

export function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link to="/orders">
        <Button variant="outline" size="icon">
          <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
        </Button>
      </Link>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>
        <p className="text-muted-foreground">Order #{order.id.slice(-8)}</p>
      </div>
    </div>
  )
}
