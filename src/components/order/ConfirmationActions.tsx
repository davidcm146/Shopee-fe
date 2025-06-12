import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag, faHome } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"

export function ConfirmationActions() {
  return (
    <div className="flex gap-4">
      <Link to="/orders" className="flex-1">
        <Button variant="outline" className="w-full">
          <FontAwesomeIcon icon={faShoppingBag} className="h-4 w-4 mr-2" />
          View My Orders
        </Button>
      </Link>
      <Link to="/" className="flex-1">
        <Button className="w-full bg-orange-500 hover:bg-orange-600">
          <FontAwesomeIcon icon={faHome} className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}
