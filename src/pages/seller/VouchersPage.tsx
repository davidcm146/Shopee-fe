import { VoucherManagement } from "@/components/seller/vouchers/VoucherManagement"

export default function VouchersPage() {
  const sellerId = "seller1"

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Vouchers Management</h1>
        <p className="text-muted-foreground">Manage vouchers and surprises for customer</p>
      </div>

      <VoucherManagement sellerId={sellerId} />
    </div>
  )
}