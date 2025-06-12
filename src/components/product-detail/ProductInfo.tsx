"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faHeart, faShare, faShoppingCart, faMinus, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useCart } from "../../context/CartContext"
import type { Product } from "../../types/product"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || "")
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { addToCart, getItemQuantity } = useCart()

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    addToCart(product, quantity, selectedVariant)
    setShowSuccess(true)
    setIsAdding(false)

    // Hide success message after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const currentQuantityInCart = getItemQuantity(product.id, selectedVariant)

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">{product.sold || 0} sold</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-orange-500">${product.price}</span>
        {product.originalPrice && (
          <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
        )}
        {product.discount && <Badge className="bg-orange-500">{product.discount}% OFF</Badge>}
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Variants</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 border rounded-md text-sm ${
                  selectedVariant === variant
                    ? "border-orange-500 bg-orange-50 text-orange-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="font-medium mb-3">Quantity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <button onClick={decreaseQuantity} className="p-2 hover:bg-gray-100" disabled={quantity <= 1}>
              <FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
            </button>
            <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
            <button onClick={increaseQuantity} className="p-2 hover:bg-gray-100">
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">{product.stock || 100} pieces available</span>
          {currentQuantityInCart > 0 && (
            <span className="text-sm text-orange-500">({currentQuantityInCart} in cart)</span>
          )}
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
          <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
          <span className="text-sm">Added to cart successfully!</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={handleAddToCart} disabled={isAdding}>
          <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4 mr-2" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
        <Button variant="outline" size="icon">
          <FontAwesomeIcon icon={faHeart} className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <FontAwesomeIcon icon={faShare} className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Features */}
      {product.features && (
        <div className="border-t pt-6">
          <h3 className="font-medium mb-3">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-orange-500 mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
