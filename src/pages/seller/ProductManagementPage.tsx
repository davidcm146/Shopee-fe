import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faPlus, faEdit, faEye } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ProductList } from "../../components/seller/products/ProductList"
import { ProductForm } from "../../components/seller/products/ProductForm"
import { ProductDetail } from "../../components/seller/products/ProductDetail"
import type { Product } from "../../types/product"
import { products as initialProducts } from "../../data/product"

export function ProductManagementPage() {
  const [activeTab, setActiveTab] = useState("list")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [products, setProducts] = useState<Product[]>(initialProducts)

  // Get unique categories
  const categories = Array.from(new Set(products.map((product) => product.categoryId)))

  // Handle create new product
  const handleCreateNew = () => {
    setSelectedProduct(null)
    setIsEditing(false)
    setActiveTab("form")
  }

  // Handle edit product
  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
    setActiveTab("form")
  }

  // Handle view product
  const handleView = (product: Product) => {
    setSelectedProduct(product)
    setActiveTab("detail")
  }

  // Handle save product (create or update)
  const handleSaveProduct = async (productData: Partial<Product>) => {
    if (isEditing && selectedProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...selectedProduct,
        ...productData,
        discount:
          productData.originalPrice && productData.price
            ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
            : undefined,
      }

      setProducts((prev) => prev.map((product) => (product.id === selectedProduct.id ? updatedProduct : product)))
    } else {
      // Create new product
      const maxId = products.reduce((max, product) => Math.max(max, product.id), 0)
      const newProduct: Product = {
        id: maxId + 1,
        name: productData.name || "Untitled Product",
        price: productData.price || 0,
        originalPrice: productData.originalPrice,
        discount:
          productData.originalPrice && productData.price
            ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
            : undefined,
        rating: 0,
        reviews: 0,
        images: productData.images || ["/placeholder.svg?height=500&width=500&text=Product+Image"],
        categoryId: productData.categoryId || "1",
        sellerId: "seller1",
        description: productData.description || "",
        features: productData.features || [],
        specifications: productData.specifications || {},
        variants: productData.variants || [],
        stock: productData.stock || 0,
        sold: 0,
      }

      setProducts((prev) => [newProduct, ...prev])
    }

    // Reset state and go back to list
    setSelectedProduct(null)
    setIsEditing(false)
    setActiveTab("list")
  }

  // Handle delete product
  const handleDeleteProduct = async (productId: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId))
  }

  // Handle form cancel
  const handleFormCancel = () => {
    setSelectedProduct(null)
    setIsEditing(false)
    setActiveTab("list")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-orange-500 hover:bg-orange-600">
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">
            <FontAwesomeIcon icon={faList} className="h-4 w-4 mr-2" />
            Product List
          </TabsTrigger>
          <TabsTrigger value="form">
            <FontAwesomeIcon icon={isEditing ? faEdit : faPlus} className="h-4 w-4 mr-2" />
            {isEditing ? "Edit Product" : "Add Product"}
          </TabsTrigger>
          {selectedProduct && (
            <TabsTrigger value="detail">
              <FontAwesomeIcon icon={faEye} className="h-4 w-4 mr-2" />
              Product Detail
            </TabsTrigger>
          )}
        </TabsList>

        {/* Product List Tab */}
        <TabsContent value="list">
          <ProductList
            products={products}
            onEdit={handleEdit}
            onView={handleView}
            onCreateNew={handleCreateNew}
            onDelete={handleDeleteProduct}
          />
        </TabsContent>

        {/* Product Form Tab */}
        <TabsContent value="form">
          <ProductForm
            product={isEditing ? selectedProduct : null}
            categories={categories}
            onCancel={handleFormCancel}
            onSave={handleSaveProduct}
          />
        </TabsContent>

        {/* Product Detail Tab */}
        {selectedProduct && (
          <TabsContent value="detail">
            <ProductDetail product={selectedProduct} onEdit={handleEdit} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
