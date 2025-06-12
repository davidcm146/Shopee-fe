import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"

interface OrdersHeaderProps {
  totalOrders: number
}

export function OrdersHeader({ totalOrders }: OrdersHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FontAwesomeIcon icon={faShoppingBag} className="h-6 w-6" />
        My Orders
      </h1>
      <p className="text-muted-foreground">
        {totalOrders > 0 ? `You have ${totalOrders} orders` : "Track and manage your orders"}
      </p>
    </div>
  )
}
