import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faShoppingCart, faUser, faBars } from "@fortawesome/free-solid-svg-icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Badge } from "./ui/badge"
import { useCart } from "../context/CartContext"
import { AuthButtons } from "./auth/AuthButton"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const isLoggedIn = false // This would come from your auth context in a real app
  const totalItems = getTotalItems()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const query = formData.get("mobileSearch") as string
    if (query?.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
      <div className="container flex h-16 items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" className="text-lg font-medium hover:text-orange-500 transition-colors">
                Home
              </Link>
              <a href="#categories" className="text-lg font-medium hover:text-orange-500 transition-colors">
                Categories
              </a>
              <a href="#flash-sale" className="text-lg font-medium hover:text-orange-500 transition-colors">
                Flash Sale
              </a>
              <a href="#popular" className="text-lg font-medium hover:text-orange-500 transition-colors">
                Top Products
              </a>
              <Link to="/cart" className="text-lg font-medium hover:text-orange-500 transition-colors">
                Cart ({totalItems})
              </Link>
              {!isLoggedIn && (
                <>
                  <Link to="/login" className="text-lg font-medium hover:text-orange-500 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="text-lg font-medium hover:text-orange-500 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-orange-500">Shopee</span>
          </Link>
        </div>
        <div className="flex-1 mx-4 hidden md:flex">
          <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border-orange-500 focus-visible:ring-orange-500"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 top-0 h-full bg-orange-500 hover:bg-orange-600 rounded-l-none"
            >
              <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
        <div className="flex items-center gap-4">
          {/* Auth buttons for desktop */}
          <div className="hidden md:block">
            <AuthButtons isLoggedIn={isLoggedIn} />
          </div>

          {/* User icon only shows when logged in */}
          {isLoggedIn && (
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          )}

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="container md:hidden py-2">
        <form onSubmit={handleMobileSearch} className="relative w-full">
          <Input
            type="search"
            name="mobileSearch"
            placeholder="Search for products..."
            className="w-full pl-4 pr-10 py-2 border-orange-500 focus-visible:ring-orange-500"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-0 top-0 h-full bg-orange-500 hover:bg-orange-600 rounded-l-none"
          >
            <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>
    </header>
  )
}
