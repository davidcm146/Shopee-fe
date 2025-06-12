"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"
import { Loader2, Edit } from "lucide-react"
import { updateOrderStatusInDb, getValidStatusTransitions } from "@/data/order"
import type { OrderStatus } from "@/types/order"

interface OrderStatusUpdateProps {
  orderId: string
  currentStatus: OrderStatus
  sellerId: string
  onStatusUpdated?: (orderId: string, newStatus: OrderStatus) => void
}

export function OrderStatusUpdate({ orderId, currentStatus, sellerId, onStatusUpdated }: OrderStatusUpdateProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const availableStatuses = getValidStatusTransitions(currentStatus)

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      packed: "bg-purple-100 text-purple-800",
      shipped: "bg-orange-100 text-orange-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status]
  }

  const handleUpdateStatus = async () => {
    if (selectedStatus === currentStatus) {
      setIsOpen(false)
      return
    }

    setIsUpdating(true)
    try {
      const result = await updateOrderStatusInDb(orderId, selectedStatus, sellerId)

      if (result) {
        onStatusUpdated?.(orderId, selectedStatus)
        setIsOpen(false)
      } else {
        console.log("Fail to update order");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false)
    }
  }

  // Don't show update button for final states
  if (availableStatuses.length === 0) {
    return (
      <Badge className={getStatusColor(currentStatus)}>
        {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
      </Badge>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Edit className="h-3 w-3 mr-1" />
          <Badge className={getStatusColor(currentStatus)}>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the status of order {orderId}. This action will notify the buyer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right text-sm font-medium">
              Status
            </label>
            <div className="col-span-3">
              <Select value={selectedStatus} onValueChange={(value: OrderStatus) => setSelectedStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={currentStatus} disabled>
                    {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)} (Current)
                  </SelectItem>
                  {availableStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus} disabled={isUpdating || selectedStatus === currentStatus}>
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
