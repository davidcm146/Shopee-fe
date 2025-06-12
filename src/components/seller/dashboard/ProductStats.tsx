import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBox,
  faEye,
  faShoppingCart,
  faExclamationTriangle,
  faStar,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"

interface ProductStat {
  id: string
  name: string
  status: "active" | "draft" | "out_of_stock"
  views: number
  sales: number
  rating: number
  stock: number
}

export function ProductStats() {
  // Mock data - replace with actual API calls
  const productStats: ProductStat[] = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      status: "active",
      views: 1250,
      sales: 89,
      rating: 4.5,
      stock: 45,
    },
    {
      id: "2",
      name: "Smart Phone Case",
      status: "active",
      views: 890,
      sales: 156,
      rating: 4.8,
      stock: 23,
    },
    {
      id: "3",
      name: "USB-C Charging Cable",
      status: "out_of_stock",
      views: 567,
      sales: 234,
      rating: 4.2,
      stock: 0,
    },
    {
      id: "4",
      name: "Laptop Stand",
      status: "active",
      views: 445,
      sales: 67,
      rating: 4.6,
      stock: 12,
    },
    {
      id: "5",
      name: "Wireless Mouse",
      status: "draft",
      views: 0,
      sales: 0,
      rating: 0,
      stock: 30,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Active
          </Badge>
        )
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { icon: faExclamationTriangle, color: "text-red-500" }
    if (stock < 20) return { icon: faExclamationTriangle, color: "text-yellow-500" }
    return { icon: faCheckCircle, color: "text-green-500" }
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBox} className="h-5 w-5 text-orange-500" />
          Top Products Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {productStats.map((product) => {
            const stockStatus = getStockStatus(product.stock)
            return (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{product.name}</h4>
                    {getStatusBadge(product.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faEye} className="h-3 w-3" />
                      {product.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faShoppingCart} className="h-3 w-3" />
                      {product.sales}
                    </div>
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-yellow-500" />
                        {product.rating}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <FontAwesomeIcon icon={stockStatus.icon} className={`h-4 w-4 ${stockStatus.color}`} />
                  <span className="text-sm font-medium">{product.stock}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {productStats.filter((p) => p.status === "active").length}
              </p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {productStats.filter((p) => p.stock < 20 && p.stock > 0).length}
              </p>
              <p className="text-xs text-muted-foreground">Low Stock</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{productStats.filter((p) => p.stock === 0).length}</p>
              <p className="text-xs text-muted-foreground">Out of Stock</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
