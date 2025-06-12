import { Link } from "react-router-dom"
import { Button } from "../ui/button"

export function OrderNotFound() {
  return (
    <div className="container py-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
      <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
      <Link to="/">
        <Button className="bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
      </Link>
    </div>
  )
}
