"use client"

import { Button } from "../ui/button"

interface CartHeaderProps {
  totalItems: number
  onClearCart: () => void
}

export function CartHeader({ totalItems, onClearCart }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Shopping Cart ({totalItems} items)</h1>
      <Button variant="outline" onClick={onClearCart} className="text-red-600 hover:text-red-700">
        Clear Cart
      </Button>
    </div>
  )
}
