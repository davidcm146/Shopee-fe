"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ChatToggle } from "@/components/chat/ChatToggle"
import { ChatPopup } from "@/components/chat/ChatPopup"
import type { User } from "@/types/user"

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(3)

  // Mock current user - Trong thực tế sẽ lấy từ auth state
  const currentUser: User = {
    userId: "current-user-id",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
    address: ["123 Main St", "New York, NY 10001"],
    role: "BUYER",
    createdAt: new Date(),
  }

  // Mock support user
  const supportUser: User = {
    userId: "support-user-id",
    name: "Customer Support",
    email: "support@company.com",
    password: "",
    address: [],
    role: "SELLER",
    createdAt: new Date(),
  }

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen)
    if (!isChatOpen) {
      setUnreadMessages(0) // Clear unread khi mở chat
    }
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />

      {/* Global Chat System */}
      <ChatToggle isOpen={isChatOpen} onToggle={handleToggleChat} unreadCount={unreadMessages} />
      <ChatPopup isOpen={isChatOpen} onClose={handleCloseChat} currentUser={currentUser} supportUser={supportUser} />
    </>
  )
}
