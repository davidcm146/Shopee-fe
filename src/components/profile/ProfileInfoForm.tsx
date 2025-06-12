"use client"

import type React from "react"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faMapMarkerAlt, faPlus, faMinus, faSave } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { User, UpdateUserProfile } from "../../types/user"

interface ProfileInfoFormProps {
  user: User
  onUpdate: (data: UpdateUserProfile) => Promise<void>
  isLoading?: boolean
}

export function ProfileInfoForm({ user, onUpdate, isLoading = false }: ProfileInfoFormProps) {
  const [formData, setFormData] = useState<UpdateUserProfile>({
    name: user.name,
    email: user.email,
    address: user.address.length > 0 ? user.address : [""],
    role: user.role,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Filter out empty addresses
      const filteredData = {
        ...formData,
        address: formData.address.filter((addr) => addr.trim() !== ""),
      }
      await onUpdate(filteredData)
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addAddress = () => {
    setFormData((prev) => ({
      ...prev,
      address: [...prev.address, ""],
    }))
  }

  const removeAddress = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      address: prev.address.filter((_, i) => i !== index),
    }))
  }

  const updateAddress = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: prev.address.map((addr, i) => (i === index ? value : addr)),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Addresses */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Addresses</label>
              <Button type="button" variant="outline" size="sm" onClick={addAddress}>
                <FontAwesomeIcon icon={faPlus} className="h-3 w-3 mr-1" />
                Add Address
              </Button>
            </div>
            <div className="space-y-3">
              {formData.address.map((address, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative flex-1">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <Input
                      type="text"
                      value={address}
                      onChange={(e) => updateAddress(index, e.target.value)}
                      placeholder={`Address ${index + 1}`}
                      className="pl-10"
                    />
                  </div>
                  {formData.address.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeAddress(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600"
            disabled={isSubmitting || isLoading}
          >
            <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
