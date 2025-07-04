import { useParams } from "react-router-dom"
import { OrderHeader } from "../components/order-detail/OrderHeader"
import { OrderItemsCard } from "../components/order-detail/OrderItemsCard"
import { DeliveryAddressCard } from "../components/order-detail/DeliveryAdressCard"
import { OrderSummarySidebar } from "../components/order-detail/OrderSummarySidebar"
import { OrderNotFound } from "../components/order/OrderNotFound"
import { getOrderById } from "../data/order"

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const [originalOrderId, sellerId] = orderId?.split("+") || []

  const fullOrder = originalOrderId ? getOrderById(originalOrderId) : null

  if (!fullOrder || !sellerId) {
    return <OrderNotFound />
  }

  const filteredItems = fullOrder.items.filter((item) => item.sellerId === sellerId)

  if (filteredItems.length === 0) {
    return <OrderNotFound />
  }

  const order = {
    ...fullOrder,
    items: filteredItems,
  }

  return (
    <div className="container py-6 mx-auto max-w-4xl">
      <OrderHeader order={order} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsCard order={order} />
          <DeliveryAddressCard address={order.deliveryAddress} />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummarySidebar order={order} />
        </div>
      </div>
    </div>
  )
}

