import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import type { Product } from "../../types/product"

interface ProductTabsProps {
  product: Product
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <div className="mb-10">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {product.description || "No description available for this product."}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <div className="space-y-4">
            {product.specifications ? (
              Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b pb-2">
                  <span className="font-medium w-1/3 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No specifications available.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Standard Delivery</span>
              <span className="text-muted-foreground">3-5 business days</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Express Delivery</span>
              <span className="text-muted-foreground">1-2 business days</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Free Shipping</span>
              <span className="text-muted-foreground">Orders over $50</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Return Policy</span>
              <span className="text-muted-foreground">30 days return</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
