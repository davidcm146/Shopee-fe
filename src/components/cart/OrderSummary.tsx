import {Link} from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useCart } from "@/context/CartContext"

export function OrderSummary() {
  const { getSelectedItems, getSelectedItemsCount, getSelectedItemsTotal, state } = useCart()

  const selectedItems = getSelectedItems()
  const selectedItemsCount = getSelectedItemsCount()
  const selectedItemsTotal = getSelectedItemsTotal()
  const hasSelectedItems = selectedItems.length > 0

  // Create checkout URL with selected item IDs
  const checkoutUrl = hasSelectedItems ? `/checkout?selectedItems=${state.selectedItems.join(",")}` : "/checkout"

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-20">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            {hasSelectedItems ? (
              <span className="text-orange-600 font-medium">
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected for checkout
              </span>
            ) : (
              <span>Select items to proceed with checkout</span>
            )}
          </div>

          <div className="flex justify-between">
            <span>Subtotal ({selectedItemsCount} items)</span>
            <span>${selectedItemsTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">{hasSelectedItems ? "Free" : "$0.00"}</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-500">${selectedItemsTotal.toFixed(2)}</span>
            </div>
          </div>

          {hasSelectedItems ? (
            <Link to={checkoutUrl}>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-6 mb-3">
                Proceed to Checkout ({selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""})
              </Button>
            </Link>
          ) : (
            <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-6 mb-3" disabled>
              Select Items to Checkout
            </Button>
          )}

          <Link to="/">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>

          {!hasSelectedItems && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Please select at least one item to proceed with checkout
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
