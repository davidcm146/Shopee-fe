"use client"

import { useState, useEffect, useRef } from "react"
import { Minimize2, Maximize2, X, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import type { ChatMessage as ChatMessageType } from "@/types/message"
import type { User } from "@/types/user"

interface ChatPopupProps {
    isOpen: boolean
    onClose: () => void
    currentUser: User
    supportUser: User
}

export function ChatPopup({ isOpen, onClose, currentUser, supportUser }: ChatPopupProps) {
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<ChatMessageType[]>([
        {
            id: "1",
            sentBy: supportUser.userId,
            content: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
            sendTo: currentUser.userId,
            status: "DELIVERED",
            createdAt: new Date(Date.now() - 300000),
            isUser: false,
            senderInfo: {
                userId: supportUser.userId,
                name: supportUser.name,
                role: supportUser.role,
            },
        },
        {
            id: "2",
            sentBy: currentUser.userId,
            content: "Chào bạn, tôi có câu hỏi về đơn hàng của mình",
            sendTo: supportUser.userId,
            status: "SEEN",
            createdAt: new Date(Date.now() - 240000),
            isUser: true,
            senderInfo: {
                userId: currentUser.userId,
                name: currentUser.name,
                role: currentUser.role,
            },
        },
        {
            id: "3",
            sentBy: supportUser.userId,
            content: "Tôi rất sẵn lòng hỗ trợ bạn về đơn hàng. Bạn có thể cung cấp mã đơn hàng để tôi kiểm tra không?",
            sendTo: currentUser.userId,
            status: "DELIVERED",
            createdAt: new Date(Date.now() - 180000),
            isUser: false,
            senderInfo: {
                userId: supportUser.userId,
                name: supportUser.name,
                role: supportUser.role,
            },
        },
    ])
    const [isTyping, setIsTyping] = useState(false)
    const [isOnline, setIsOnline] = useState(true)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    // Check online status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight
            }
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = (content: string) => {
        const newMessage: ChatMessageType = {
            id: Date.now().toString(),
            sentBy: currentUser.userId,
            content,
            sendTo: supportUser.userId,
            status: "SENT",
            createdAt: new Date(),
            isUser: true,
            senderInfo: {
                userId: currentUser.userId,
                name: currentUser.name,
                role: currentUser.role,
            },
        }

        setMessages((prev) => [...prev, newMessage])
        setIsTyping(true)

        // Simulate message status updates
        setTimeout(() => {
            setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "DELIVERED" } : msg)))
        }, 1000)

        setTimeout(() => {
            setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "SEEN" } : msg)))
        }, 2000)

        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.",
                "Tôi đã nhận được tin nhắn của bạn. Vui lòng chờ trong giây lát.",
                "Đội ngũ hỗ trợ sẽ liên hệ với bạn trong thời gian sớm nhất.",
                "Bạn có thể cung cấp thêm thông tin chi tiết để tôi hỗ trợ tốt hơn không?",
            ]
            const randomResponse = responses[Math.floor(Math.random() * responses.length)]

            const botResponse: ChatMessageType = {
                id: (Date.now() + 1).toString(),
                sentBy: supportUser.userId,
                content: randomResponse,
                sendTo: currentUser.userId,
                status: "DELIVERED",
                createdAt: new Date(),
                isUser: false,
                senderInfo: {
                    userId: supportUser.userId,
                    name: supportUser.name,
                    role: supportUser.role,
                },
            }
            setMessages((prev) => [...prev, botResponse])
            setIsTyping(false)
        }, 1500)
    }

    if (!isOpen) return null

    const getRoleBadgeColor = (role: "BUYER" | "SELLER") => {
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
        <div className="fixed bottom-24 right-6 z-40">
            <Card
                className={cn(
                    "w-[350px] py-0 bg-white shadow-2xl transition-all duration-300 ease-in-out border-0 rounded-lg overflow-hidden flex flex-col",
                    isMinimized ? "h-16" : "max-h-[calc(100vh-200px)]",
                )}
            >
                {/* Header - Fixed height */}
                <div className="h-16 flex items-center justify-between p-4 border-b bg-orange-500 text-white flex-shrink-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-9 w-9 flex-shrink-0">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" />
                            <AvatarFallback className="bg-orange-600 text-white text-sm font-medium">
                                {supportUser.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-sm truncate">{supportUser.name}</h3>
                                <Badge
                                    variant="secondary"
                                    className={cn("text-xs px-2 py-0.5 flex-shrink-0 font-medium", getRoleBadgeColor(supportUser.role))}
                                >
                                    {supportUser.role}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Circle
                                    className={`h-2 w-2 flex-shrink-0 ${isOnline ? "fill-green-400 text-green-400" : "fill-gray-400 text-gray-400"}`}
                                />
                                <span className="text-xs opacity-90">{isOnline ? "Đang online" : "Offline"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Header buttons */}
                    <div className="flex items-center gap-1 flex-shrink-0 ml-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-white hover:bg-orange-600 h-8 w-8 p-0 flex-shrink-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Chat Content - Only show when not minimized */}
                {!isMinimized && (
                    <>
                        <div className="h-[384px] flex flex-col">
                            <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-3 overflow-y-auto">
                                <div className="space-y-4">
                                    {messages.map((message, index) => {
                                        const prevMessage = index > 0 ? messages[index - 1] : null
                                        const isConsecutive =
                                            prevMessage &&
                                            prevMessage.sentBy === message.sentBy &&
                                            message.createdAt.getTime() - prevMessage.createdAt.getTime() < 60000 // 1 phút

                                        return <ChatMessage key={message.id} message={message} isConsecutive={isConsecutive} />
                                    })}

                                    {isTyping && (
                                        <div className="flex gap-3">
                                            <Avatar className="h-8 w-8 flex-shrink-0">
                                                <AvatarFallback className="bg-gray-500 text-white text-xs">
                                                    {supportUser.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>

                            {/* Input Area */}
                            <div className="h-[80px] border-t bg-white flex-shrink-0">
                                <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} placeholder="Nhập tin nhắn..." />
                            </div>
                        </div>

                    </>
                )}
            </Card>
        </div>
    )
}
