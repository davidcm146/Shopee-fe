import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"

export function ConfirmationHeader() {
  return (
    <div className="text-center mb-8">
      <FontAwesomeIcon icon={faCheckCircle} className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground">Thank you for your purchase. Your order has been placed successfully.</p>
    </div>
  )
}
