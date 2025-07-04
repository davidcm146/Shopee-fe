"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, CheckCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ChatMessage as ChatMessageType, MessageStatus } from "@/types/message"

interface ChatMessageProps {
  message: ChatMessageType
  showAvatar?: boolean
  isConsecutive?: boolean | null
}

export function ChatMessage({ message, showAvatar = true, isConsecutive = false }: ChatMessageProps) {
  const { content, createdAt, isUser, status, senderInfo } = message

  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case "SENT":
        return <Check className="h-3 w-3 text-gray-400" />
      case "DELIVERED":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "SEEN":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  const getRoleBadgeColor = (role?: "BUYER" | "SELLER") => {
    switch (role) {
      case "BUYER":
        return "bg-blue-100 text-blue-800"
      case "SELLER":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      {showAvatar && !isConsecutive && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback
            className={cn("text-xs font-medium", isUser ? "bg-orange-500 text-white" : "bg-gray-500 text-white")}
          >
            {isUser ? "You" : senderInfo?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      )}

      {showAvatar && isConsecutive && <div className="h-8 w-8 flex-shrink-0" />}

      <div className={cn("flex flex-col max-w-[80%]", isUser ? "items-end" : "items-start")}>
        {/* Sender name and role for non-consecutive messages */}
        {!isConsecutive && !isUser && senderInfo && (
          <div className="flex items-center gap-2 mb-1 px-1">
            <span className="text-xs font-medium text-gray-700">{senderInfo.name}</span>
            <Badge
              variant="secondary"
              className={cn("text-xs px-2 py-0.5 font-medium", getRoleBadgeColor(senderInfo.role))}
            >
              {senderInfo.role}
            </Badge>
          </div>
        )}

        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm break-words leading-relaxed",
            isUser
              ? "bg-orange-500 text-white rounded-br-md shadow-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200",
          )}
        >
          {content}
        </div>

        <div className={cn("flex items-center gap-1.5 mt-1 px-1", isUser ? "flex-row-reverse" : "flex-row")}>
          <span className="text-xs text-gray-500">
            {createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {isUser && getStatusIcon(status)}
        </div>
      </div>
    </div>
  )
}
