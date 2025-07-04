"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { updateOrderItemStatus } from "@/data/order"
import type { OrderItemStatus } from "@/types/order"
import { Edit, Package, Truck, CheckCircle, XCircle } from "lucide-react"

interface UpdateItemStatusDialogProps {
  orderId: string
  itemIndex: number
  currentStatus: OrderItemStatus
  productName: string
  onStatusUpdated?: () => void
}

export function OrderUpdateStats({
  orderId,
  itemIndex,
  currentStatus,
  productName,
  onStatusUpdated,
}: UpdateItemStatusDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<OrderItemStatus>(currentStatus)
  const [notes, setNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Available status options (excluding pending since it has its own confirm button)
  const statusOptions: { value: OrderItemStatus; label: string; icon: any; description: string }[] = [
    {
      value: "confirmed",
      label: "Confirmed",
      icon: CheckCircle,
      description: "Order has been confirmed and accepted",
    },
    {
      value: "packed",
      label: "Packed",
      icon: Package,
      description: "Item has been packed and ready for shipping",
    },
    {
      value: "shipping",
      label: "Shipping",
      icon: Truck,
      description: "Item has been shipped to customer",
    },
    {
      value: "delivered",
      label: "Delivered",
      icon: CheckCircle,
      description: "Item has been delivered to customer",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      description: "Item has been cancelled",
    },
  ]

  // Filter out statuses that don't make sense based on current status
  const getAvailableStatuses = () => {
    const statusOrder = ["confirmed", "packed", "shipping", "delivered"]
    const currentIndex = statusOrder.indexOf(currentStatus)

    switch (currentStatus) {
      case "pending":
        // Pending items should use the confirm button, not this dialog
        return []
      case "confirmed":
        return statusOptions.filter((option) => ["packed", "cancelled"].includes(option.value))
      case "packed":
        return statusOptions.filter((option) => ["shipped", "cancelled"].includes(option.value))
      case "shipping":
        return statusOptions.filter((option) => ["delivered"].includes(option.value))
      case "delivered":
        // Delivered items cannot be changed
        return []
      case "cancelled":
        // Cancelled items cannot be changed
        return []
      default:
        return statusOptions
    }
  }

  const availableStatuses = getAvailableStatuses()

  const getStatusColor = (status: OrderItemStatus) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "shipping":
        return "bg-blue-500"
      case "packed":
        return "bg-purple-500"
      case "confirmed":
        return "bg-indigo-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleStatusUpdate = async () => {
    if (selectedStatus === currentStatus) {
      setOpen(false)
      return
    }

    setIsUpdating(true)
    try {
      await updateOrderItemStatus(orderId, itemIndex, selectedStatus, notes || undefined)
      onStatusUpdated?.()
      setOpen(false)
      setNotes("")
      // Optionally refresh the page to show updated status
      window.location.reload()
    } catch (error) {
      console.error("Failed to update item status:", error)
      // You could add toast notification here
    } finally {
      setIsUpdating(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSelectedStatus(currentStatus)
      setNotes("")
    }
    setOpen(newOpen)
  }

  // Don't render the dialog if no status updates are available
  if (availableStatuses.length === 0) {
    return null
  }

  const selectedStatusOption = statusOptions.find((option) => option.value === selectedStatus)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Edit className="h-3 w-3 mr-1" />
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Item Status</DialogTitle>
          <DialogDescription>Update the status for "{productName}"</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Status */}
          <div>
            <Label className="text-sm font-medium">Current Status</Label>
            <div className="mt-1">
              <Badge className={`${getStatusColor(currentStatus)} text-white`}>
                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
              </Badge>
            </div>
          </div>

          {/* New Status Selection */}
          <div>
            <Label htmlFor="status" className="text-sm font-medium">
              New Status
            </Label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as OrderItemStatus)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map((option) => {
                  const Icon = option.icon
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Status Preview */}
          {selectedStatus !== currentStatus && selectedStatusOption && (
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <selectedStatusOption.icon className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Status will be updated to:</span>
              </div>
              <Badge className={`${getStatusColor(selectedStatus)} text-white`}>
                {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
              </Badge>
              <p className="text-xs text-gray-600 mt-1">{selectedStatusOption.description}</p>
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this status update..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            disabled={isUpdating || selectedStatus === currentStatus}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isUpdating ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
