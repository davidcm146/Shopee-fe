import { OrderManagement } from "@/components/seller/orders/OrderManagement"

export default function OrdersManagementPage() {
  const sellerId = "sellerA"

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">Manage and update your order statuses</p>
      </div>

      <OrderManagement sellerId={sellerId} />
    </div>
  )
}
