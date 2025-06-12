"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTicket, faCheck, faTimes, faTag } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { getAvailableVouchers, calculateVoucherDiscount } from "../../data/voucher"
import type { Voucher, AppliedVoucher } from "../../types/voucher"

interface VoucherSelectionProps {
  orderAmount: number
  onVoucherApply: (appliedVoucher: AppliedVoucher | null) => void
  appliedVoucher: AppliedVoucher | null
}

export function VoucherSelection({ orderAmount, onVoucherApply, appliedVoucher }: VoucherSelectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const availableVouchers = getAvailableVouchers("guest-user", orderAmount)

  const handleVoucherSelect = (voucher: Voucher) => {
    const discountAmount = calculateVoucherDiscount(voucher, orderAmount)
    onVoucherApply({ voucher, discountAmount })
    setIsOpen(false)
  }

  const handleRemoveVoucher = () => {
    onVoucherApply(null)
  }

  const getVoucherTypeColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "bg-blue-500"
      case "fixed_amount":
        return "bg-green-500"
      case "free_shipping":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getVoucherIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return "%"
      case "fixed_amount":
        return "$"
      case "free_shipping":
        return "🚚"
      default:
        return "🎫"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faTicket} className="h-5 w-5" />
          Vouchers & Discounts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appliedVoucher ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full ${getVoucherTypeColor(appliedVoucher.voucher.type)} text-white flex items-center justify-center text-sm font-bold`}
              >
                {getVoucherIcon(appliedVoucher.voucher.type)}
              </div>
              <div>
                <p className="font-medium text-green-800">{appliedVoucher.voucher.title}</p>
                <p className="text-sm text-green-600">Saved: ${appliedVoucher.discountAmount.toFixed(2)}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveVoucher}
              className="text-green-600 hover:text-green-700 hover:bg-green-100"
            >
              <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" className="w-full justify-start" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faTag} className="h-4 w-4 mr-2" />
            Select Voucher ({availableVouchers.length} available)
          </Button>
        )}

        {isOpen && !appliedVoucher && (
          <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
            {availableVouchers.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No vouchers available for this order amount</p>
            ) : (
              availableVouchers.map((voucher) => {
                const discountAmount = calculateVoucherDiscount(voucher, orderAmount)
                const isEligible = orderAmount >= (voucher.minOrderAmount || 0)

                return (
                  <div
                    key={voucher.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      isEligible
                        ? "border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                    }`}
                    onClick={() => isEligible && handleVoucherSelect(voucher)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${getVoucherTypeColor(voucher.type)} text-white flex items-center justify-center font-bold`}
                      >
                        {getVoucherIcon(voucher.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{voucher.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {voucher.type.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{voucher.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{voucher.condition}</p>
                        {isEligible && discountAmount > 0 && (
                          <p className="text-sm font-medium text-green-600 mt-1">
                            You'll save: ${discountAmount.toFixed(2)}
                          </p>
                        )}
                      </div>
                      {isEligible && <FontAwesomeIcon icon={faCheck} className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
