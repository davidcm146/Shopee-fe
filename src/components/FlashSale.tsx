"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { getAllProducts } from "../data/product"
import { useCart } from "../context/CartContext"

export function FlashSale() {
  const products = getAllProducts()
    .filter((product) => product.discount)
    .slice(0, 6)

  const { addToCart } = useCart()

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault() // Prevent navigation to product page
    addToCart(product, 1)
  }

  return (
    <section className="py-10 bg-orange-50 px-8" id="flash-sale">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Flash Sale</h2>
            <p className="text-muted-foreground">Deals end in 06:23:45</p>
          </div>
          <Button variant="link" className="text-orange-500">
            See All
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <Link to={`/product/${product.id}`}>
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-[150px] object-cover"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-orange-500">{product.discount}% OFF</Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 h-10">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-orange-500 font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground text-xs line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{
                          width: `${((product.sold || 0) / ((product.sold || 0) + (product.stock || 100))) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{product.sold || 0} sold</p>
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="p-3 pt-0 flex gap-2">
                <Link to={`/product/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full text-xs h-8">
                    View Details
                  </Button>
                </Link>
                <Button
                  size="icon"
                  className="bg-orange-500 hover:bg-orange-600 h-8 w-8"
                  onClick={(e) => handleQuickAdd(e, product)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
