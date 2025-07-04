"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faStar } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import type { Product } from "../../../types/product"

interface ProductDetailProps {
  product: Product
  onEdit: (product: Product) => void
}

export function ProductDetail({ product, onEdit }: ProductDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-muted-foreground">Product ID: {product.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => onEdit(product)} className="bg-orange-500 hover:bg-orange-600">
            <FontAwesomeIcon icon={faEdit} className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md border"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {product.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Info */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Category</span>
                <span className="text-muted-foreground">Category {product.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Seller ID</span>
                <span className="text-muted-foreground">{product.sellerId}</span>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Current Price</span>
                <span className="text-2xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Stock</span>
                <span
                  className={`font-bold ${
                    !product.stock ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : "text-green-600"
                  }`}
                >
                  {product.stock || 0} units
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Rating</span>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{product.ratings || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
