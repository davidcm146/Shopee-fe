import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons"

interface AuthButtonsProps {
  isLoggedIn: boolean
}

export function AuthButtons({ isLoggedIn }: AuthButtonsProps) {
  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/orders">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <FontAwesomeIcon icon={faShoppingBag} className="h-5 w-5" />
            <span className="sr-only">Orders</span>
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
            <span>My Account</span>
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="ghost" size="sm">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button className="bg-orange-500 hover:bg-orange-600" size="sm">
          Register
        </Button>
      </Link>
    </div>
  )
}
