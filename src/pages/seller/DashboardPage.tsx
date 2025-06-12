import { RevenueChart } from "@/components/seller/dashboard/RevenueChart"
import { ProductStats } from "@/components/seller/dashboard/ProductStats"
import { RecentOrders } from "@/components/seller/dashboard/RecentOrders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollarSign, faBox, faShoppingCart, faUsers, faTurnUp, faTurnDown } from "@fortawesome/free-solid-svg-icons"

export function DashboardPage() {
  // Mock data - replace with actual API calls
  const stats = {
    totalRevenue: 125430,
    revenueChange: 12.5,
    totalProducts: 156,
    productsChange: 8.2,
    totalOrders: 1247,
    ordersChange: -3.1,
    totalCustomers: 892,
    customersChange: 15.7,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    const isPositive = value >= 0
    return (
      <span className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        <FontAwesomeIcon icon={isPositive ? faTurnUp : faTurnDown} className="h-3 w-3" />
        {Math.abs(value)}%
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <FontAwesomeIcon icon={faDollarSign} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              {formatPercentage(stats.revenueChange)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <FontAwesomeIcon icon={faBox} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              {formatPercentage(stats.productsChange)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              {formatPercentage(stats.ordersChange)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              {formatPercentage(stats.customersChange)} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Data */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <ProductStats />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  )
}
