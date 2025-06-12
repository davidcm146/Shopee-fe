"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Plus, Percent, DollarSign, Truck } from "lucide-react"
import { createVoucher } from "@/data/voucher"
import type { VoucherType, CreateVoucherRequest } from "@/types/voucher"

interface CreateVoucherFormProps {
  sellerId: string
  onVoucherCreated?: () => void
}

export function CreateVoucherForm({ sellerId, onVoucherCreated }: CreateVoucherFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const [formData, setFormData] = useState<CreateVoucherRequest>({
    title: "",
    description: "",
    discount: 0,
    type: "percentage",
    startDate: new Date(),
    endDate: new Date(),
    condition: "",
    minOrderAmount: 0,
    maxDiscountAmount: undefined,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const result = await createVoucher(sellerId, formData)

      if (result.success) {
        console.log("Create successfully");
      } else {
        console.log("Fail to create");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false)
    }
  }

  const getVoucherTypeIcon = (type: VoucherType) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4" />
      case "fixed_amount":
        return <DollarSign className="h-4 w-4" />
      case "free_shipping":
        return <Truck className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Voucher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Voucher</DialogTitle>
          <DialogDescription>Create a new voucher to offer discounts to your customers.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Voucher Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., 10% OFF"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Voucher Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: VoucherType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Percentage Discount
                    </div>
                  </SelectItem>
                  <SelectItem value="fixed_amount">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Fixed Amount
                    </div>
                  </SelectItem>
                  <SelectItem value="free_shipping">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Free Shipping
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your voucher offer"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">
                {formData.type === "percentage"
                  ? "Discount Percentage"
                  : formData.type === "fixed_amount"
                    ? "Discount Amount ($)"
                    : "Shipping Discount"}
              </Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                placeholder={formData.type === "percentage" ? "10" : "15"}
                min="0"
                max={formData.type === "percentage" ? "100" : undefined}
                required={formData.type !== "free_shipping"}
                disabled={formData.type === "free_shipping"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minOrderAmount">Minimum Order Amount ($)</Label>
              <Input
                id="minOrderAmount"
                type="number"
                value={formData.minOrderAmount || ""}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {formData.type === "percentage" && (
            <div className="space-y-2">
              <Label htmlFor="maxDiscountAmount">Maximum Discount Amount ($) (Optional)</Label>
              <Input
                id="maxDiscountAmount"
                type="number"
                value={formData.maxDiscountAmount || ""}
                onChange={(e) => setFormData({ ...formData, maxDiscountAmount: Number(e.target.value) || undefined })}
                placeholder="50"
                min="0"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Input
              id="condition"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              placeholder="e.g., Minimum order $50"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Voucher
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
