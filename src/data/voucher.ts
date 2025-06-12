"use server"

import type { Voucher, VoucherStatus, CreateVoucherRequest } from "@/types/voucher"

// Simple ID generation function
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const mockVouchers: Voucher[] = [
  {
    id: generateId(),
    buyerId: "seller1", // Changed to sellerId for seller-created vouchers
    discount: 10,
    type: "percentage",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    status: "active",
    condition: "Minimum order $50",
    title: "10% OFF",
    description: "Get 10% discount on orders above $50",
    minOrderAmount: 50,
    maxDiscountAmount: 20,
  },
  {
    id: generateId(),
    buyerId: "seller1",
    discount: 15,
    type: "fixed_amount",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    status: "active",
    condition: "Minimum order $100",
    title: "$15 OFF",
    description: "Get $15 off on orders above $100",
    minOrderAmount: 100,
  },
  {
    id: generateId(),
    buyerId: "seller1",
    discount: 0,
    type: "free_shipping",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-12-31"),
    status: "active",
    condition: "Minimum order $30",
    title: "FREE SHIPPING",
    description: "Free shipping on orders above $30",
    minOrderAmount: 30,
  },
  {
    id: generateId(),
    buyerId: "seller1",
    discount: 25,
    type: "percentage",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-12-31"),
    status: "inactive",
    condition: "Minimum order $200",
    title: "25% OFF",
    description: "Get 25% discount on orders above $200",
    minOrderAmount: 200,
    maxDiscountAmount: 50,
  },
  {
    id: generateId(),
    buyerId: "seller1",
    discount: 5,
    type: "fixed_amount",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-12-31"),
    status: "expired",
    condition: "No minimum order",
    title: "$5 OFF",
    description: "Get $5 off on any order",
    minOrderAmount: 0,
  },
]

// Server Actions
export async function createVoucher(
  sellerId: string,
  voucherData: CreateVoucherRequest,
): Promise<{ success: boolean; message: string; voucher?: Voucher }> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newVoucher: Voucher = {
      id: generateId(),
      buyerId: sellerId, // Using buyerId field to store sellerId for seller-created vouchers
      discount: voucherData.discount,
      type: voucherData.type,
      startDate: voucherData.startDate,
      endDate: voucherData.endDate,
      status: "active",
      condition: voucherData.condition,
      title: voucherData.title,
      description: voucherData.description,
      minOrderAmount: voucherData.minOrderAmount,
      maxDiscountAmount: voucherData.maxDiscountAmount,
    }

    mockVouchers.push(newVoucher)

    return {
      success: true,
      message: "Voucher created successfully",
      voucher: newVoucher,
    }
  } catch (error) {
    console.error("Error creating voucher:", error)
    return {
      success: false,
      message: "Failed to create voucher. Please try again.",
    }
  }
}

export async function updateVoucherStatus(
  voucherId: string,
  status: VoucherStatus,
  sellerId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const voucherIndex = mockVouchers.findIndex((v) => v.id === voucherId && v.buyerId === sellerId)

    if (voucherIndex === -1) {
      return {
        success: false,
        message: "Voucher not found or unauthorized",
      }
    }

    mockVouchers[voucherIndex] = {
      ...mockVouchers[voucherIndex],
      status,
    }

    return {
      success: true,
      message: `Voucher status updated to ${status}`,
    }
  } catch (error) {
    console.error("Error updating voucher status:", error)
    return {
      success: false,
      message: "Failed to update voucher status",
    }
  }
}

// Data fetching functions
export async function getVouchersBySeller(sellerId: string): Promise<Voucher[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockVouchers.filter((voucher) => voucher.buyerId === sellerId)
}

export async function getVoucherById(voucherId: string): Promise<Voucher | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockVouchers.find((voucher) => voucher.id === voucherId) || null
}

// Utility functions
export function getAvailableVouchers(buyerId: string, orderAmount: number): Voucher[] {
  return mockVouchers.filter(
    (voucher) =>
      voucher.status === "active" &&
      new Date() >= voucher.startDate &&
      new Date() <= voucher.endDate &&
      orderAmount >= (voucher.minOrderAmount || 0),
  )
}

export function calculateVoucherDiscount(voucher: Voucher, orderAmount: number): number {
  if (orderAmount < (voucher.minOrderAmount || 0)) {
    return 0
  }

  switch (voucher.type) {
    case "percentage":
      const percentageDiscount = (orderAmount * voucher.discount) / 100
      return voucher.maxDiscountAmount ? Math.min(percentageDiscount, voucher.maxDiscountAmount) : percentageDiscount

    case "fixed_amount":
      return Math.min(voucher.discount, orderAmount)

    case "free_shipping":
      return 0 // Shipping discount is handled separately

    default:
      return 0
  }
}

export function getVoucherStats(vouchers: Voucher[]) {
  return {
    total: vouchers.length,
    active: vouchers.filter((v) => v.status === "active").length,
    inactive: vouchers.filter((v) => v.status === "inactive").length,
    expired: vouchers.filter((v) => v.status === "expired").length,
    used: vouchers.filter((v) => v.status === "used").length,
  }
}
