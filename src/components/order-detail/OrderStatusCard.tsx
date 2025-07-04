// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faShoppingBag,
//   faTruck,
//   faBox,
//   faCheckCircle,
//   faCalendarAlt,
//   faTimes,
//   faExclamationTriangle,
// } from "@fortawesome/free-solid-svg-icons"
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { Badge } from "../ui/badge"
// import type { Order, OrderStatus, OrderItemStatus } from "../../types/order"
// import { calculateOrderStatus } from "../../data/order"

// interface OrderStatusCardProps {
//   order: Order
// }

// export function OrderStatusCard({ order }: OrderStatusCardProps) {
//   // Calculate the actual order status based on item statuses
//   const actualOrderStatus = calculateOrderStatus(order.items)

//   const getStatusColor = (status: OrderStatus) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-500"
//       case "pending":
//         return "bg-yellow-500"
//       case "cancelled":
//         return "bg-red-500"
//       default:
//         return "bg-gray-500"
//     }
//   }

//   const getItemStatusColor = (status: OrderItemStatus) => {
//     switch (status) {
//       case "delivered":
//         return "bg-green-500"
//       case "shipping":
//         return "bg-blue-500"
//       case "packed":
//         return "bg-purple-500"
//       case "confirmed":
//         return "bg-indigo-500"
//       case "pending":
//         return "bg-yellow-500"
//       case "cancelled":
//         return "bg-red-500"
//       default:
//         return "bg-gray-500"
//     }
//   }

//   const getStatusIcon = (status: OrderStatus) => {
//     switch (status) {
//       case "completed":
//         return faCheckCircle
//       case "pending":
//         return faExclamationTriangle
//       case "cancelled":
//         return faTimes
//       default:
//         return faShoppingBag
//     }
//   }

//   const getItemStatusIcon = (status: OrderItemStatus) => {
//     switch (status) {
//       case "delivered":
//         return faCheckCircle
//       case "shipping":
//         return faTruck
//       case "packed":
//         return faBox
//       case "confirmed":
//         return faShoppingBag
//       case "pending":
//         return faCalendarAlt
//       case "cancelled":
//         return faTimes
//       default:
//         return faShoppingBag
//     }
//   }

//   const formatDate = (date: Date | string) => {
//     if (typeof date === "string") {
//       return new Date(date).toLocaleDateString()
//     }
//     return date.toLocaleDateString()
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <FontAwesomeIcon icon={getStatusIcon(actualOrderStatus)} className="h-5 w-5" />
//           Order Status
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center gap-3 mb-6">
//           <Badge className={`${getStatusColor(actualOrderStatus)} text-white`}>
//             {actualOrderStatus.charAt(0).toUpperCase() + actualOrderStatus.slice(1)}
//           </Badge>
//           <span className="text-sm text-muted-foreground">Order placed: {formatDate(order.createdAt)}</span>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
