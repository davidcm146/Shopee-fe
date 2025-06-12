import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"

export function EmptyOrders() {
  return (
    <div className="text-center py-8">
      <FontAwesomeIcon icon={faShoppingBag} className="h-12 w-12 text-gray-300 mb-4" />
      <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
      <Link to="/">
        <Button className="bg-orange-500 hover:bg-orange-600">Start Shopping</Button>
      </Link>
    </div>
  )
}
