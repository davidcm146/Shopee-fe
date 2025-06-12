"use client"

import { useParams } from "react-router-dom"
import { ProductImageGallery } from "../components/product-detail/ProductImageGallery"
import { ProductInfo } from "../components/product-detail/ProductInfo"
import { ProductReviews } from "../components/product-detail/ProductReviews"
import { RelatedProducts } from "../components/product-detail/RelatedProducts"
import { ProductTabs } from "../components/product-detail/ProductTabs"
import { getProductById } from "../data/product"
import { getCategoryById } from "@/data/category"

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = getProductById(Number(id))

  if (!product) {
    return (
      <div className="container py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const category = getCategoryById(product.categoryId)

  return (
    <div className="container py-6 px-8 ">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-orange-500">
          Home
        </a>
        <span>/</span>
        <span className="capitalize">{category?.name || "Unknown"}</span>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <ProductImageGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      {/* Product Tabs */}
      <ProductTabs product={product} />

      {/* Reviews */}
      <ProductReviews productId={product.id} />

      {/* Related Products */}
      <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
    </div>
  )
}
