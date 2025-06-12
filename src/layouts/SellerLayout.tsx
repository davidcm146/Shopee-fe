"use client"

import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTachometerAlt,
  faBox,
  faShoppingCart,
  faChartLine,
  faCog,
  faUser,
  faBars,
  faTimes,
  faStore,
  faUsers,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "../components/ui/button"

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: faTachometerAlt,
    path: "/seller/dashboard",
  },
  {
    id: "products",
    label: "Products",
    icon: faBox,
    path: "/seller/products",
  },
  {
    id: "orders",
    label: "Orders",
    icon: faShoppingCart,
    path: "/seller/orders",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: faChartLine,
    path: "/seller/analytics",
  },
  {
    id: "customers",
    label: "Customers",
    icon: faUsers,
    path: "/seller/customers",
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: faClipboardList,
    path: "/seller/inventory",
  },
  {
    id: "settings",
    label: "Settings",
    icon: faCog,
    path: "/seller/settings",
  },
]

export function SellerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faStore} className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">Seller Center</span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
          </Button>
        </div>

        {/* Seller Info */}
        <div className="p-6 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium">John's Store</p>
              <p className="text-sm text-muted-foreground">Premium Seller</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path) ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">
                {sidebarItems.find((item) => isActive(item.path))?.label || "Seller Center"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Store
            </Link>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
