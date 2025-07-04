"use client"

import { useState } from "react"
import { ProfileHeader } from "../components/profile/ProfileHeader"
import { ProfileInfoForm } from "../components/profile/ProfileInfoForm"
import { PasswordChangeForm } from "../components/profile/PasswordChangeForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import type { User, UpdateUserProfile, UpdateUserPassword } from "../types/user"
import { mockUser } from "@/data/user"

export function ProfilePage() {
    const [user, setUser] = useState<User>(mockUser)
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message)
        setTimeout(() => setSuccessMessage(""), 3000)
    }

    const handleUpdateProfile = async (data: UpdateUserProfile) => {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Update user data
            // setUser((prev) => ({
            //     ...prev,
            //     ...data,
            // }))

            showSuccessMessage("Profile updated successfully!")
            console.log("Profile updated:", data)
        } catch (error) {
            console.error("Failed to update profile:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdatePassword = async (data: UpdateUserPassword) => {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // In a real app, you would validate the current password and update it
            console.log("Password update request:", {
                userId: user.userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            })

            showSuccessMessage("Password updated successfully!")
        } catch (error) {
            console.error("Failed to update password:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center">
            <div className="w-full max-w-4xl px-8 space-y-8">
                {/* Success Message */}
                {successMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-center">
                        {successMessage}
                    </div>
                )}

                {/* Profile Header */}
                <div>
                    <ProfileHeader user={user} />
                </div>

                {/* Profile Management Tabs */}
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">Profile Information</TabsTrigger>
                        <TabsTrigger value="password">Change Password</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="mt-6">
                        <ProfileInfoForm user={user} onUpdate={handleUpdateProfile} isLoading={isLoading} />
                    </TabsContent>

                    <TabsContent value="password" className="mt-6">
                        <PasswordChangeForm onUpdate={handleUpdatePassword} isLoading={isLoading} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
