"use client"

import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ChatToggleProps {
  isOpen: boolean
  onToggle: () => void
  unreadCount?: number
}

export function ChatToggle({ isOpen, onToggle, unreadCount = 0 }: ChatToggleProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onToggle}
        size="lg"
        className="relative h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg transition-all duration-200 hover:scale-105"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </>
        )}
      </Button>
    </div>
  )
}
