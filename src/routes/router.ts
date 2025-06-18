import { createBrowserRouter } from "react-router-dom"
import App from "@/layouts/App"
import { HomePage } from "@/pages/Home"
import LoginPage from "@/pages/Login"
import RegisterPage from "@/pages/Register"
import { ProductDetailPage } from "@/pages/ProductDetailsPage"
import { CartPage } from "@/pages/CartPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { OrderConfirmationPage } from "@/pages/OrderConfirmationPage"
import { OrderDetailPage } from "@/pages/OrderDetailPage"
import { CheckoutPage } from "@/pages/CheckoutPage"
import { OrdersPage } from "@/pages/OrdersPage"
import { ProductsPage } from "@/pages/ProductsPage"
import { SellerLayout } from "@/layouts/SellerLayout"
import { ProductManagementPage } from "@/pages/seller/ProductManagementPage"
import { DashboardPage } from "@/pages/seller/DashboardPage"
import OrdersManagementPage from "@/pages/seller/OrdersManagementPage"
import VouchersPage from "@/pages/seller/VouchersPage"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "product/:id", Component: ProductDetailPage},
      { path: "cart", Component: CartPage},
      { path: "profile", Component: ProfilePage },
      { path: "order-confirmation/:orderId", Component: OrderConfirmationPage},
      { path: "order/:orderId", Component: OrderDetailPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "orders", Component: OrdersPage },
      { path: "products", Component: ProductsPage }
    ],
  },
  {
    path: "/seller",
    Component: SellerLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "products", Component: ProductManagementPage },
      { path: "orders", Component: OrdersManagementPage },
      { path: "vouchers", Component: VouchersPage}
    ],
  },
])
