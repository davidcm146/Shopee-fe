export interface Voucher {
  id: string
  buyerId: string
  discount: number
  type: VoucherType
  startDate: Date
  endDate: Date
  status: VoucherStatus
  condition: string
  title: string
  description: string
  minOrderAmount?: number
  maxDiscountAmount?: number
}

export type VoucherType = "percentage" | "fixed_amount" | "free_shipping"
export type VoucherStatus = "active" | "used" | "expired" | "inactive"

export interface AppliedVoucher {
  voucher: Voucher
  discountAmount: number
}

export interface CreateVoucherRequest {
  title: string
  description: string
  discount: number
  type: VoucherType
  startDate: Date
  endDate: Date
  condition: string
  minOrderAmount?: number
  maxDiscountAmount?: number
}
