import { cn } from "@/lib/utils"
import type React from "react"
import { useState } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
    onSendMessage: (message: string) => void
    disabled?: boolean
    placeholder?: string
}

export function ChatInput({ onSendMessage, disabled = false, placeholder = "Nhập tin nhắn..." }: ChatInputProps) {
    const [message, setMessage] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim() && !disabled) {
            onSendMessage(message.trim())
            setMessage("") // Clear input after sending
        }
    }

    return (
        <div className="h-full flex items-center p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
                {/* Attachment button */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-9 w-9 p-0 flex-shrink-0 rounded-full"
                >
                    <Paperclip className="h-4 w-4" />
                </Button>

                {/* Input field with emoji button */}
                <div className="flex-1 relative">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={1}
                        wrap="soft"
                        className="w-full resize-none pr-12 border border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-full bg-gray-50 focus:bg-white transition-colors py-2 px-4 text-sm min-h-[40px] max-h-32 overflow-y-auto"
                        style={{ lineHeight: "1.4rem" }}
                    />


                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-5 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 w-8 p-0 rounded-full"
                    >
                        <Smile className="h-4 w-4" />
                    </Button>
                </div>

                {/* Send button */}
                <Button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    size="sm"
                    className={cn(
                        "h-9 w-9 p-0 flex-shrink-0 rounded-full transition-all duration-200",
                        message.trim() && !disabled
                            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed",
                    )}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    )
}
