import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCalendarAlt, faShield } from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import type { User } from "../../types/user"

interface ProfileHeaderProps {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-500"
      case "seller":
        return "bg-blue-500"
      case "customer":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="h-8 w-8 text-orange-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                <FontAwesomeIcon icon={faShield} className="h-3 w-3 mr-1" />
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2">{user.email}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FontAwesomeIcon icon={faCalendarAlt} className="h-3 w-3" />
              <span>Member since {user.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {user.address.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium mb-2">Addresses:</h3>
            <div className="space-y-1">
              {user.address.map((addr, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  {index + 1}. {addr}
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
