"use client"

import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface CheckoutHeaderProps {
  selectedItemsCount: number
}

export function CheckoutHeader({ selectedItemsCount }: CheckoutHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>
      <p className="text-muted-foreground">
        Complete your purchase ({selectedItemsCount} item{selectedItemsCount !== 1 ? "s" : ""} selected)
      </p>
    </div>
  )
}
