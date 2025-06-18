"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateVoucherForm } from "./CreateVoucherForm"
import { getVouchersBySeller, updateVoucherStatus, getVoucherStats } from "@/data/voucher"
import { Search, Filter, Ticket, Percent, DollarSign, Truck, Calendar, Users, TrendingUp } from "lucide-react"
import type { Voucher, VoucherStatus, VoucherType } from "@/types/voucher"

interface VoucherManagementProps {
  sellerId: string
}

export function VoucherManagement({ sellerId }: VoucherManagementProps) {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<VoucherStatus | "all">("all")
  const [typeFilter, setTypeFilter] = useState<VoucherType | "all">("all")

  useEffect(() => {
    loadVouchers()
  }, [sellerId])

  useEffect(() => {
    filterVouchers()
  }, [vouchers, searchTerm, statusFilter, typeFilter])

  const loadVouchers = async () => {
    try {
      setLoading(true)
      const fetchedVouchers = await getVouchersBySeller(sellerId)
      setVouchers(fetchedVouchers)
    } catch (error) {
      console.error("Failed to load vouchers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterVouchers = () => {
    let filtered = vouchers

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (voucher) =>
          voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          voucher.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          voucher.condition.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((voucher) => voucher.status === statusFilter)
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((voucher) => voucher.type === typeFilter)
    }

    setFilteredVouchers(filtered)
  }

  const handleStatusUpdate = async (voucherId: string, newStatus: VoucherStatus) => {
    try {
      const result = await updateVoucherStatus(voucherId, newStatus, sellerId)

      if (result.success) {
        console.log(result.message);
        setVouchers((prev) => prev.map((v) => (v.id === voucherId ? { ...v, status: newStatus } : v)))
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getStatusBadge = (status: VoucherStatus) => {
    const statusConfig = {
      active: { variant: "default" as const, className: "bg-green-500 hover:bg-green-600" },
      inactive: { variant: "secondary" as const, className: "" },
      expired: { variant: "destructive" as const, className: "" },
      used: { variant: "outline" as const, className: "" },
    }

    const config = statusConfig[status]
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeIcon = (type: VoucherType) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4 text-blue-500" />
      case "fixed_amount":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "free_shipping":
        return <Truck className="h-4 w-4 text-orange-500" />
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const formatDiscount = (voucher: Voucher) => {
    switch (voucher.type) {
      case "percentage":
        return `${voucher.discount}%`
      case "fixed_amount":
        return `$${voucher.discount}`
      case "free_shipping":
        return "Free Shipping"
    }
  }

  const stats = getVoucherStats(vouchers)

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Ticket className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading vouchers...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vouchers</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Ticket className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Vouchers</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Used Vouchers</p>
                <p className="text-2xl font-bold text-blue-600">{stats.used}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voucher Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-orange-500" />
              Voucher Management
            </CardTitle>
            <CreateVoucherForm sellerId={sellerId} onVoucherCreated={loadVouchers} />
          </div>

          {/* Filters */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vouchers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value: VoucherStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="used">Used</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(value: VoucherType | "all") => setTypeFilter(value)}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                <SelectItem value="free_shipping">Free Shipping</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {filteredVouchers.length === 0 ? (
            <div className="text-center py-8">
              <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No vouchers found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first voucher to start offering discounts"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVouchers.map((voucher) => (
                <div key={voucher.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(voucher.type)}
                        <h4 className="font-semibold">{voucher.title}</h4>
                        {getStatusBadge(voucher.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{voucher.description}</p>
                      <p className="text-xs text-muted-foreground">{voucher.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatDiscount(voucher)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(voucher.startDate)} - {formatDate(voucher.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-sm text-muted-foreground">
                      {voucher.minOrderAmount && voucher.minOrderAmount > 0 && (
                        <span>Min order: ${voucher.minOrderAmount}</span>
                      )}
                      {voucher.maxDiscountAmount && (
                        <span className="ml-4">Max discount: ${voucher.maxDiscountAmount}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {voucher.status === "active" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(voucher.id, "inactive")}>
                          Deactivate
                        </Button>
                      )}
                      {voucher.status === "inactive" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(voucher.id, "active")}>
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
