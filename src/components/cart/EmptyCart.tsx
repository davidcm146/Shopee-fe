import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"

export function EmptyCart() {
  return (
    <div className="container py-10">
      <div className="text-center">
        <FontAwesomeIcon icon={faShoppingBag} className="h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/">
          <Button className="bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}
