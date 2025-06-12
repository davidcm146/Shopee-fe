import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"

interface OrderHeaderProps {
  orderId: string
}

export function OrderHeader({ orderId }: OrderHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link to="/orders">
        <Button variant="outline" size="icon">
          <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
        </Button>
      </Link>
      <div>
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">Order #{orderId.slice(-8)}</p>
      </div>
    </div>
  )
}
