import type { User } from "./user"

// Base types for the chat system
export type MessageStatus = "SENT" | "DELIVERED" | "SEEN"

// Core Message interface based on Cassandra schema
export interface Message {
  id: string // uuid
  sentBy: string // uuid - references User.userId
  content: string // text
  sendTo: string // uuid - references User.userId
  status: MessageStatus // varchar
  seenAt?: Date // Datetime
  createdAt: Date // Datetime (CreatedAt in schema)
}

export interface ChatHeaderProps {
  conversation: any // Placeholder for ChatConversation
  onMinimize: () => void
  onClose: () => void
  isMinimized: boolean
}

// Extended types for UI components
export interface ChatMessage extends Message {
  isUser: boolean // Helper for UI rendering
  senderInfo?: Pick<User, "userId" | "name" | "role"> // Sender details for UI
  recipientInfo?: Pick<User, "userId" | "name" | "role"> // Recipient details for UI
}

// Chat conversation interface
export interface ChatConversation {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  updatedAt: Date
}

// Chat input types
export interface SendMessageRequest {
  content: string
  sendTo: string // References User.userId
  tempId?: string // For optimistic updates
}

// API Response types
export interface SendMessageResponse {
  success: boolean
  message?: Message
  error?: string
}

export interface GetMessagesResponse {
  messages: Message[]
  hasMore: boolean
  nextCursor?: string
}

// Chat state types
export interface ChatState {
  conversations: ChatConversation[]
  activeConversation?: string
  messages: Record<string, Message[]>
  users: Record<string, User>
  isLoading: boolean
  error?: string
}

// Typing indicator
export interface TypingIndicator {
  userId: string
  conversationId: string
  isTyping: boolean
  timestamp: Date
}
