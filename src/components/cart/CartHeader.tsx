"use client"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { useCart } from "@/context/CartContext"

export function CartHeader() {
  const { getTotalItems, clearCart, selectAllItems, deselectAllItems, isAllItemsSelected, state } = useCart()

  const totalItems = getTotalItems()
  const selectedCount = state.selectedItems.length
  const allSelected = isAllItemsSelected()

  const handleSelectAllChange = (checked: boolean | string) => {
    if (checked) {
      selectAllItems()
    } else {
      deselectAllItems()
    }
  }

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart()
    }
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        {totalItems > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox
              checked={allSelected}
              onCheckedChange={handleSelectAllChange}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <span>
              Select All ({selectedCount} of {totalItems} selected)
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <span className="text-sm text-orange-600 font-medium">
            {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
          </span>
        )}
        <Button variant="outline" onClick={handleClearCart} className="text-red-600 hover:text-red-700">
          Clear Cart
        </Button>
      </div>
    </div>
  )
}
