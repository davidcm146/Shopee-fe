import { api } from "./api"
import type { CreateVoucherRequest, Voucher, VoucherStatus } from "@/types/voucher"

const BASE_URL = "/vouchers"

function parseVoucher(v: any): Voucher {
  return {
    ...v,
    startDate: new Date(v.startDate),
    endDate: new Date(v.endDate),
  }
}

// Lấy tất cả voucher khả dụng cho user và số tiền đơn hàng
export async function getAvailableVouchers(userId: string, orderAmount: number): Promise<Voucher[]> {
  const res = await api.get<Voucher[]>(`${BASE_URL}/available`, {
    params: { userId, amount: orderAmount },
  })

  return res.data.map(parseVoucher)
}

// Tính giá trị giảm giá của voucher theo tổng tiền đơn hàng
export function calculateVoucherDiscount(voucher: Voucher, orderAmount: number): number {
  if (voucher.type === "percentage") {
    const percentValue = (voucher.discount / 100) * orderAmount
    return voucher.maxDiscountAmount ? Math.min(percentValue, voucher.maxDiscountAmount) : percentValue
  }

  if (voucher.type === "fixed_amount") {
    return voucher.discount
  }

  return 0 // free_shipping không ảnh hưởng số tiền
}

// Áp dụng danh sách voucher cho đơn hàng
export async function applyVouchersToOrder(orderId: string, voucherIds: string[]): Promise<void> {
  await api.post(`${BASE_URL}/apply`, { orderId, voucherIds })
}

// Tạo voucher cho seller
export async function createVoucher(sellerId: string, data: CreateVoucherRequest): Promise<Voucher> {
  const res = await api.post<Voucher>(`/sellers/${sellerId}/vouchers`, data)
  return parseVoucher(res.data)
}

// Lấy danh sách voucher theo seller
export async function getVouchersBySeller(sellerId: string): Promise<Voucher[]> {
  const res = await api.get<Voucher[]>(`/sellers/${sellerId}/vouchers`)
  return res.data.map(parseVoucher)
}

// Cập nhật trạng thái voucher
export async function updateVoucherStatus(
  voucherId: string,
  status: VoucherStatus,
  sellerId: string
): Promise<Voucher> {
  const res = await api.patch<Voucher>(`/sellers/${sellerId}/vouchers/${voucherId}/status`, { status })
  return parseVoucher(res.data)
}

// Thống kê voucher theo trạng thái
export function getVoucherStats(vouchers: Voucher[]) {
  return {
    total: vouchers.length,
    active: vouchers.filter((v) => v.status === "active").length,
    used: vouchers.filter((v) => v.status === "used").length,
    expired: vouchers.filter((v) => v.status === "expired").length,
  }
}
