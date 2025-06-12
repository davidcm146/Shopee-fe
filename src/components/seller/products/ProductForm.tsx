"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash, faSave, faUpload } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import type { Product } from "../../../types/product"

interface ProductFormProps {
  product?: Product | null
  categories: string[]
  onCancel: () => void
  onSave: (productData: Partial<Product>) => Promise<void>
}

export function ProductForm({ product, categories, onCancel, onSave }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEditing = !!product

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    images: [],
    categoryId: categories[0] || "1",
    stock: 0,
    features: [],
    specifications: {},
    variants: [],
  })

  // Additional form states
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [newVariant, setNewVariant] = useState("")

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        originalPrice: product.originalPrice || 0,
        images: product.images,
        categoryId: product.categoryId,
        stock: product.stock || 0,
        features: product.features || [],
        specifications: product.specifications || {},
        variants: product.variants || [],
      })
    } else {
      // Reset form for new product
      const defaultCategory = categories.length > 0 ? categories[0] : "1"
      setFormData({
        name: "",
        description: "",
        price: 0,
        originalPrice: 0,
        images: [],
        categoryId: defaultCategory,
        stock: 0,
        features: [],
        specifications: {},
        variants: [],
      })
    }
    setErrors({})
  }, [product, categories])

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) newErrors.name = "Product name is required"
    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.originalPrice && formData.originalPrice < 0)
      newErrors.originalPrice = "Original price cannot be negative"
    if (formData.stock === undefined || formData.stock < 0) newErrors.stock = "Stock cannot be negative"
    if (!formData.categoryId) newErrors.categoryId = "Category is required"
    if (!formData.images?.length) newErrors.images = "At least one image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSave(formData)
    } catch (error) {
      console.error("Failed to save product:", error)
      setErrors({
        submit: "Failed to save product. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))
  }

  const handleAddImage = () => {
    const placeholderImage = `/placeholder.svg?height=500&width=500&text=Product+${(formData.images?.length || 0) + 1}`
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), placeholderImage],
    }))
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }))
  }

  const handleAddSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return

    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...(prev.specifications || {}),
        [newSpecKey]: newSpecValue,
      },
    }))

    setNewSpecKey("")
    setNewSpecValue("")
  }

  const handleRemoveSpecification = (key: string) => {
    setFormData((prev) => {
      const newSpecs = { ...(prev.specifications || {}) }
      delete newSpecs[key]
      return {
        ...prev,
        specifications: newSpecs,
      }
    })
  }

  const handleAddFeature = () => {
    if (!newFeature.trim()) return

    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeature.trim()],
    }))

    setNewFeature("")
  }

  const handleRemoveFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.filter((f) => f !== feature),
    }))
  }

  const handleAddVariant = () => {
    if (!newVariant.trim()) return

    setFormData((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant.trim()],
    }))

    setNewVariant("")
  }

  const handleRemoveVariant = (variant: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants?.filter((v) => v !== variant),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">{errors.submit}</div>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name *</label>
            <Input
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={5}
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="categoryId"
              value={formData.categoryId || ""}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${errors.categoryId ? "border-red-500" : ""}`}
            >
              <option value="">Select Category</option>
              {categories.map((categoryId) => (
                <option key={categoryId} value={categoryId}>
                  Category {categoryId}
                </option>
              ))}
              <option value="new">+ Add New Category</option>
            </select>
            {formData.categoryId === "new" && (
              <Input
                className="mt-2"
                placeholder="New category ID"
                onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
              />
            )}
            {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Pricing and Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($) *</label>
              <Input
                type="number"
                name="price"
                value={formData.price || 0}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Original Price ($)</label>
              <Input
                type="number"
                name="originalPrice"
                value={formData.originalPrice || ""}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={errors.originalPrice ? "border-red-500" : ""}
                placeholder="Leave empty if no discount"
              />
              {errors.originalPrice && <p className="text-red-500 text-xs mt-1">{errors.originalPrice}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <Input
                type="number"
                name="stock"
                value={formData.stock || 0}
                onChange={handleInputChange}
                min="0"
                className={errors.stock ? "border-red-500" : ""}
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Product Images *</label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddImage}>
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>
            {errors.images && <p className="text-red-500 text-xs mb-2">{errors.images}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImage}
                className="flex items-center justify-center h-32 border-2 border-dashed rounded-md hover:bg-gray-50 transition-colors"
              >
                <FontAwesomeIcon icon={faUpload} className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-sm text-gray-500">Upload</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature())}
            />
            <Button type="button" onClick={handleAddFeature}>
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features?.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(feature)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Specification name"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
            />
            <Input
              placeholder="Specification value"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
            />
            <Button type="button" onClick={handleAddSpecification}>
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {Object.entries(formData.specifications || {}).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>
                  <strong>{key}:</strong> {value}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSpecification(key)}
                  className="text-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Product Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add variant (e.g. 'Red', 'Small', 'Cotton')"
              value={newVariant}
              onChange={(e) => setNewVariant(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddVariant())}
            />
            <Button type="button" onClick={handleAddVariant}>
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.variants?.map((variant) => (
              <span
                key={variant}
                className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded"
              >
                {variant}
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(variant)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
          <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
          {isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  )
}
