"use client"

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useCart } from "../../context/CartContext"
import type { CartItem as CartItemType } from "../../types/cart"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link to={`/product/${item.productId}`}>
            <img
              src={item.product?.images?.[0] || "/placeholder.svg"}
              alt={item.product?.name || "Product"}
              className="w-20 h-20 object-cover rounded-md"
            />
          </Link>
          <div className="flex-1">
            <Link to={`/product/${item.productId}`}>
              <h3 className="font-medium hover:text-orange-500 transition-colors">{item.product?.name || "Product"}</h3>
            </Link>
            {item.selectedVariant && <p className="text-sm text-muted-foreground">Variant: {item.selectedVariant}</p>}
            <p className="text-lg font-bold text-orange-500 mt-1">${item.unitPrice}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.cartItemId)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
            </Button>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                className="p-1 hover:bg-gray-100"
                disabled={item.quantity <= 1}
              >
                <FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
              </button>
              <span className="px-3 py-1 min-w-[50px] text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                className="p-1 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="text-sm text-muted-foreground">Subtotal:</span>
          <span className="font-bold">${(item.unitPrice * item.quantity).toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
