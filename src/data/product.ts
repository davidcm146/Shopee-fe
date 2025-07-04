import type { Product } from "@/types/product"

export const products: Product[] = [
  {
    id: "1",
    name: "Smartphone X Pro",
    price: 599.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Smartphone+Front",
      "/placeholder.svg?height=500&width=500&text=Smartphone+Back",
      "/placeholder.svg?height=500&width=500&text=Smartphone+Side",
    ],
    category: "electronics",
    sellerId: "sellerA",
    ratings: 4.8,
    description:
      "Experience the future with our latest Smartphone X Pro. Featuring a stunning 6.7-inch OLED display, advanced triple-camera system, and lightning-fast 5G connectivity.",
    features: [
      "6.7-inch OLED Display with 120Hz refresh rate",
      "Triple camera system with 108MP main sensor",
      "5G connectivity for ultra-fast internet",
      "256GB storage with 12GB RAM",
      "All-day battery life with fast charging",
      "Water and dust resistant (IP68)",
    ],
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Wireless Noise Cancelling Headphones",
    price: 199.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Headphones+Front",
      "/placeholder.svg?height=500&width=500&text=Headphones+Side",
      "/placeholder.svg?height=500&width=500&text=Headphones+Case",
    ],
    category: "electronics",
    sellerId: "sellerA",
    ratings: 4.7,
    description:
      "Immerse yourself in premium sound quality with our wireless noise-cancelling headphones. Advanced ANC technology blocks out distractions while delivering crystal-clear audio.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Quick charge: 5 minutes = 3 hours playback",
      "Premium comfort with memory foam ear cups",
      "Multi-device connectivity",
      "Voice assistant compatible",
    ],
    stock: 75,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Men's Casual Shirt",
    price: 39.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Shirt+Front",
      "/placeholder.svg?height=500&width=500&text=Shirt+Back",
      "/placeholder.svg?height=500&width=500&text=Shirt+Detail",
    ],
    category: "fashion",
    sellerId: "sellerB",
    ratings: 4.5,
    description:
      "Elevate your casual wardrobe with this premium cotton shirt. Perfect blend of comfort and style, suitable for both casual outings and semi-formal occasions.",
    features: [
      "100% premium cotton fabric",
      "Breathable and comfortable fit",
      "Easy care - machine washable",
      "Classic collar design",
      "Available in multiple colors",
      "Wrinkle-resistant finish",
    ],
    stock: 120,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Smart Home Speaker",
    price: 129.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Speaker+Front",
      "/placeholder.svg?height=500&width=500&text=Speaker+Top",
      "/placeholder.svg?height=500&width=500&text=Speaker+Setup",
    ],
    category: "household",
    sellerId: "sellerB",
    ratings: 4.6,
    description:
      "Transform your home into a smart home with our intelligent speaker. Voice-controlled convenience meets premium audio quality.",
    features: [
      "Voice control with built-in assistant",
      "360-degree premium sound",
      "Smart home hub functionality",
      "Multi-room audio support",
      "Touch controls and LED display",
      "Privacy controls with mute button",
    ],
    stock: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Facial Cleanser Set",
    price: 49.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Cleanser+Set",
      "/placeholder.svg?height=500&width=500&text=Cleanser+Bottles",
      "/placeholder.svg?height=500&width=500&text=Cleanser+Usage",
    ],
    category: "beauty",
    sellerId: "sellerC",
    ratings: 4.9,
    description:
      "Complete skincare routine in one set. Our gentle yet effective facial cleanser set includes everything you need for healthy, glowing skin.",
    features: [
      "Gentle formula for all skin types",
      "Removes makeup and impurities",
      "Hydrating and nourishing ingredients",
      "Dermatologist tested",
      "Cruelty-free and vegan",
      "Complete 3-step routine",
    ],
    stock: 90,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Running Shoes",
    price: 89.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Shoes+Side",
      "/placeholder.svg?height=500&width=500&text=Shoes+Front",
      "/placeholder.svg?height=500&width=500&text=Shoes+Sole",
    ],
    category: "sports",
    sellerId: "sellerC",
    ratings: 4.7,
    description:
      "Step up your running game with our premium running shoes. Engineered for comfort, performance, and durability.",
    features: [
      "Lightweight and breathable design",
      "Advanced cushioning technology",
      "Durable rubber outsole",
      "Moisture-wicking interior",
      "Reflective details for visibility",
      "Available in multiple sizes",
    ],
    stock: 85,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Laptop Ultrabook",
    price: 899.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Laptop+Front",
      "/placeholder.svg?height=500&width=500&text=Laptop+Side",
      "/placeholder.svg?height=500&width=500&text=Laptop+Open",
    ],
    category: "electronics",
    sellerId: "sellerD",
    ratings: 4.8,
    description:
      "Ultra-portable laptop designed for professionals and students. Powerful performance in a sleek, lightweight design.",
    features: [
      "Intel Core i7 processor",
      "16GB RAM, 512GB SSD",
      "14-inch Full HD display",
      "All-day battery life",
      "Lightweight at 2.8 lbs",
      "Fast charging technology",
    ],
    stock: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Women's Handbag",
    price: 79.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Handbag+Front",
      "/placeholder.svg?height=500&width=500&text=Handbag+Side",
      "/placeholder.svg?height=500&width=500&text=Handbag+Interior",
    ],
    category: "fashion",
    sellerId: "sellerE",
    ratings: 4.6,
    description:
      "Elegant and practical handbag perfect for everyday use. Crafted from premium materials with thoughtful organization.",
    features: [
      "Premium leather construction",
      "Multiple compartments",
      "Adjustable shoulder strap",
      "Secure zipper closure",
      "Interior organizer pockets",
      "Available in multiple colors",
    ],
    stock: 65,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getAllProducts(): Product[] {
  return products
}
