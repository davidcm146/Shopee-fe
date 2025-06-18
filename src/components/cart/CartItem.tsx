"use client"

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { getProductById } from "@/data/product"
import type { CartItem as CartItemType } from "@/types/cart"

interface CartItemProps {
  item: CartItemType
  onRemove: (itemId: string) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const product = getProductById(item.productId)

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1)
    }
  }

  const handleQuantityIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1)
  }

  const handleRemove = () => {
    onRemove(item.id)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link to={`/product/${item.productId}`}>
            <img
              src={product?.images?.[0] || "/placeholder.svg?height=80&width=80"}
              alt={product?.name || "Product"}
              className="w-20 h-20 object-cover rounded-md"
            />
          </Link>
          <div className="flex-1">
            <Link to={`/product/${item.productId}`}>
              <h3 className="font-medium hover:text-orange-500 transition-colors">
                {product?.name || `Product ${item.productId}`}
              </h3>
            </Link>
            {item.selectedVariant && <p className="text-sm text-muted-foreground">Variant: {item.selectedVariant}</p>}
            <p className="text-lg font-bold text-orange-500 mt-1">${item.unitPrice.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Added: {item.createdAt.toLocaleDateString()}
              {item.updatedAt && new Date(item.updatedAt).getTime() !== new Date(item.createdAt).getTime() && (
                <span> • Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
              )}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Remove item from cart"
            >
              <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
            </Button>
            <div className="flex items-center border rounded-md">
              <button
                onClick={handleQuantityDecrease}
                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={item.quantity <= 1}
                title="Decrease quantity"
              >
                <FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
              </button>
              <span className="px-3 py-1 min-w-[50px] text-center text-sm font-medium">{item.quantity}</span>
              <button onClick={handleQuantityIncrease} className="p-1 hover:bg-gray-100" title="Increase quantity">
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
