import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine } from "@fortawesome/free-solid-svg-icons"

interface RevenueData {
  month: string
  revenue: number
  orders: number
}

export function RevenueChart() {
  // Mock data - replace with actual API calls
  const revenueData: RevenueData[] = [
    { month: "Jan", revenue: 8500, orders: 85 },
    { month: "Feb", revenue: 9200, orders: 92 },
    { month: "Mar", revenue: 8800, orders: 88 },
    { month: "Apr", revenue: 10500, orders: 105 },
    { month: "May", revenue: 11200, orders: 112 },
    { month: "Jun", revenue: 12800, orders: 128 },
    { month: "Jul", revenue: 13500, orders: 135 },
    { month: "Aug", revenue: 12200, orders: 122 },
    { month: "Sep", revenue: 14800, orders: 148 },
    { month: "Oct", revenue: 15200, orders: 152 },
    { month: "Nov", revenue: 16800, orders: 168 },
    { month: "Dec", revenue: 18500, orders: 185 },
  ]

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 text-orange-500" />
          Revenue Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Simple bar chart */}
          <div className="space-y-3">
            {revenueData.slice(-6).map((data, index) => (
              <div key={data.month} className="flex items-center gap-4">
                <div className="w-8 text-sm font-medium">{data.month}</div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(data.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-sm font-medium w-20 text-right">{formatCurrency(data.revenue)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">This Month</p>
                <p className="font-semibold text-lg">{formatCurrency(revenueData[revenueData.length - 1].revenue)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Month</p>
                <p className="font-semibold text-lg">{formatCurrency(revenueData[revenueData.length - 2].revenue)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
