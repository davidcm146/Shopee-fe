import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent } from "../ui/card"
import { getProductsByCategory } from "../../data/product"
import { getCategoryById } from "@/data/category"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: number
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const relatedProducts = getProductsByCategory(categoryId)
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4)

  const category = getCategoryById(categoryId)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Related Products in {category?.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-[150px] object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 h-10 mb-2">{product.name}</h3>
                  <p className="text-orange-500 font-bold">${product.price}</p>
                  <div className="flex items-center gap-1 mt-1">
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
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
