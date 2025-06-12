"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { useCart } from "../../context/CartContext"
import type { Product } from "../../types/product"

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const { addToCart } = useCart()

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="border shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
          <Link to={`/product/${product.id}`}>
            <CardContent className="p-0">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-sm line-clamp-2 h-10 mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-orange-500 font-bold">${product.price}</p>
                  {product.originalPrice && (
                    <p className="text-muted-foreground text-xs line-through">${product.originalPrice}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
              </div>
            </CardContent>
          </Link>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Link to={`/product/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            <Button
              size="icon"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={(e) => handleQuickAdd(e, product)}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
