import type React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash, faSave, faUpload } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import type { Product } from "@/types/product"

interface ProductFormProps {
  product?: Product | null
  categories: string[]
  onCancel: () => void
  onSave: (productData: Product) => Promise<void>
}

export function ProductForm({ product, categories, onCancel, onSave }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEditing = !!product

  const defaultCategory = categories[0] || ""
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    images: [],
    category: defaultCategory as Product["category"],
    stock: 0,
    features: [],
    ratings: 0,
  })

  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")
  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        images: [],
        category: (categories[0] || "fashion") as Product["category"],
        stock: 0,
        features: [],
        ratings: 0,
      })
    }
    setErrors({})
  }, [product, categories])


  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) newErrors.name = "Product name is required"
    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.stock === undefined || formData.stock < 0) {
      newErrors.stock = "Stock is required and cannot be negative"
    }
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.images?.length) newErrors.images = "At least one image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSave(formData as Product)
    } catch (error) {
      console.error("Failed to save product:", error)
      setErrors({ submit: "Failed to save product. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

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
              name="category"
              value={formData.category || ""}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${errors.category ? "border-red-500" : ""}`}
            >

              <option value="">Select Category</option>
              {categories.map((categoryId) => (
                <option key={categoryId} value={categoryId}>
                  {categoryId}
                </option>
              ))}
              <option value="new">+ Add New Category</option>
            </select>
            {formData.category === "new" && (
              <Input
                className="mt-2"
                placeholder="Enter new category"
                onChange={(e) => setFormData((prev) => ({
                  ...prev,
                  category: e.target.value as Product["category"],
                }))}
              />
            )}

            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Pricing and Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
