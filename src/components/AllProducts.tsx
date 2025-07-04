import { useState } from "react"
import type React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { getAllProducts } from "../data/product"
import { getAllCategories } from "@/data/category"
import { useCart } from "../context/CartContext"

export function AllProducts() {
  const products = getAllProducts()
  const categories = getAllCategories()
  const { addToCart } = useCart()

  const INITIAL_VISIBLE = 4

  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((cat) => [cat.id, INITIAL_VISIBLE]))
  )

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  const handleViewMore = (categoryId: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] + INITIAL_VISIBLE,
    }))
  }

  return (
    <section className="py-10 bg-white px-8" id="popular">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Popular Products</h2>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-orange-50 p-1 h-auto flex flex-wrap">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const filteredProducts =
              category.id === "all"
                ? products
                : products.filter((product) => product.category === category.id)

            const visibleCount = visibleCounts[category.id] ?? INITIAL_VISIBLE
            const visibleProducts = filteredProducts.slice(0, visibleCount)
            const hasMore = visibleCount < filteredProducts.length

            return (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {visibleProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="border shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      <Link to={`/product/${product.id}`}>
                        <CardContent className="p-0">
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-[200px] object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-medium text-sm line-clamp-2 h-10 mb-2">{product.name}</h3>
                            <p className="text-orange-500 font-bold">${product.price}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <div className="flex">
                                {/* {[...Array(5)].map((_, i) => (
                                  <FontAwesomeIcon
                                    key={i}
                                    icon={faStar}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))} */}
                              </div>
                              {/* <span className="text-xs text-muted-foreground">({product.reviews})</span> */}
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

                {/* View More Button */}
                {hasMore && (
                  <div className="text-center">
                    <Button
                      onClick={() => handleViewMore(category.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white mt-6"
                    >
                      View More
                    </Button>
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
