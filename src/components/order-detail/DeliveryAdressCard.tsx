import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface DeliveryAddressCardProps {
  address: string
}

export function DeliveryAddressCard({ address }: DeliveryAddressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5" />
          Delivery Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-3 bg-gray-50 rounded-lg border">
          <p className="text-sm">{address}</p>
        </div>
      </CardContent>
    </Card>
  )
}
