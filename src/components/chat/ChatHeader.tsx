import { Minimize2, Maximize2, X, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ChatHeaderProps } from "@/types/message"

export function ChatHeader({ conversation, onMinimize, onClose, isMinimized }: ChatHeaderProps) {
  const otherParticipant = conversation.participants.find((p: any) => p.name !== "You") || conversation.participants[0]

  return (
    <div className="flex items-center justify-between p-4 border-b bg-orange-500 text-white rounded-t-lg">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={otherParticipant.avatar || "/placeholder.svg?height=32&width=32"} />
          <AvatarFallback className="bg-orange-600 text-white text-xs">
            {otherParticipant.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-sm">{otherParticipant.name}</h3>
          <div className="flex items-center gap-1">
            <Circle
              className={`h-2 w-2 ${otherParticipant.isOnline ? "fill-green-400 text-green-400" : "fill-gray-400 text-gray-400"}`}
            />
            <span className="text-xs opacity-90">{otherParticipant.isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onMinimize} className="text-white hover:bg-orange-600 h-8 w-8 p-0">
          {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-orange-600 h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
