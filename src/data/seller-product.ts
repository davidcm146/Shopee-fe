import type { SellerProduct, ProductCategory, ProductFilters } from "../types/seller"

// Simple ID generation function
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const productCategories: ProductCategory[] = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Fashion" },
  { id: "cat3", name: "Home & Kitchen" },
  { id: "cat4", name: "Beauty & Personal Care" },
  { id: "cat5", name: "Sports & Outdoors" },
  { id: "cat6", name: "Books" },
  { id: "cat7", name: "Toys & Games" },
]

export const mockSellerProducts: SellerProduct[] = [
  {
    id: "prod1",
    sellerId: "seller1",
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation, long battery life, and comfortable fit for all-day wear.",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    images: [
      "/placeholder.svg?height=500&width=500&text=Headphones+Front",
      "/placeholder.svg?height=500&width=500&text=Headphones+Side",
      "/placeholder.svg?height=500&width=500&text=Headphones+Case",
    ],
    categoryId: "cat1",
    stock: 45,
    sku: "WBH-001",
    status: "active",
    featured: true,
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2024-01-10"),
    variants: [
      { id: "var1", name: "Black", price: 89.99, stock: 25, sku: "WBH-001-BLK" },
      { id: "var2", name: "White", price: 89.99, stock: 15, sku: "WBH-001-WHT" },
      { id: "var3", name: "Blue", price: 94.99, stock: 5, sku: "WBH-001-BLU" },
    ],
    specifications: {
      "Battery Life": "20 hours",
      "Bluetooth Version": "5.0",
      "Noise Cancellation": "Active",
      "Water Resistant": "IPX4",
    },
    tags: ["headphones", "wireless", "bluetooth", "audio"],
    rating: 4.7,
    reviewCount: 128,
    salesCount: 256,
  },
  {
    id: "prod2",
    sellerId: "seller1",
    name: "Smart Fitness Tracker",
    description:
      "Track your fitness goals with this advanced smart tracker. Features heart rate monitoring, sleep tracking, and smartphone notifications.",
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    images: [
      "/placeholder.svg?height=500&width=500&text=Fitness+Tracker",
      "/placeholder.svg?height=500&width=500&text=Tracker+App",
      "/placeholder.svg?height=500&width=500&text=Tracker+Features",
    ],
    categoryId: "cat5",
    stock: 78,
    sku: "SFT-002",
    status: "active",
    featured: true,
    createdAt: new Date("2023-11-20"),
    updatedAt: new Date("2024-01-05"),
    variants: [
      { id: "var4", name: "Black", price: 49.99, stock: 30, sku: "SFT-002-BLK" },
      { id: "var5", name: "Pink", price: 49.99, stock: 25, sku: "SFT-002-PNK" },
      { id: "var6", name: "Green", price: 49.99, stock: 23, sku: "SFT-002-GRN" },
    ],
    specifications: {
      "Battery Life": "7 days",
      "Water Resistant": "5 ATM",
      Display: "OLED Touch",
      Connectivity: "Bluetooth 5.0",
    },
    tags: ["fitness", "tracker", "smartwatch", "health"],
    rating: 4.5,
    reviewCount: 86,
    salesCount: 192,
  },
  {
    id: "prod3",
    sellerId: "seller1",
    name: "Portable Bluetooth Speaker",
    description:
      "Compact and powerful Bluetooth speaker with 360° sound, waterproof design, and 12-hour battery life. Perfect for outdoor adventures.",
    price: 39.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Speaker+Front",
      "/placeholder.svg?height=500&width=500&text=Speaker+Side",
      "/placeholder.svg?height=500&width=500&text=Speaker+Back",
    ],
    categoryId: "cat1",
    stock: 0,
    sku: "PBS-003",
    status: "out_of_stock",
    featured: false,
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2024-01-02"),
    specifications: {
      "Battery Life": "12 hours",
      "Waterproof Rating": "IPX7",
      Connectivity: "Bluetooth 5.0",
      "Power Output": "10W",
    },
    tags: ["speaker", "bluetooth", "portable", "audio"],
    rating: 4.3,
    reviewCount: 54,
    salesCount: 120,
  },
  {
    id: "prod4",
    sellerId: "seller1",
    name: "Organic Cotton T-Shirt",
    description:
      "Premium organic cotton t-shirt with a comfortable fit and eco-friendly manufacturing process. Available in multiple colors and sizes.",
    price: 24.99,
    originalPrice: 29.99,
    discount: 16,
    images: [
      "/placeholder.svg?height=500&width=500&text=Tshirt+Front",
      "/placeholder.svg?height=500&width=500&text=Tshirt+Back",
      "/placeholder.svg?height=500&width=500&text=Tshirt+Detail",
    ],
    categoryId: "cat2",
    stock: 150,
    sku: "OCT-004",
    status: "active",
    featured: false,
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-12-20"),
    variants: [
      { id: "var7", name: "Small/Black", price: 24.99, stock: 25, sku: "OCT-004-S-BLK" },
      { id: "var8", name: "Medium/Black", price: 24.99, stock: 30, sku: "OCT-004-M-BLK" },
      { id: "var9", name: "Large/Black", price: 24.99, stock: 20, sku: "OCT-004-L-BLK" },
      { id: "var10", name: "Small/White", price: 24.99, stock: 25, sku: "OCT-004-S-WHT" },
      { id: "var11", name: "Medium/White", price: 24.99, stock: 30, sku: "OCT-004-M-WHT" },
      { id: "var12", name: "Large/White", price: 24.99, stock: 20, sku: "OCT-004-L-WHT" },
    ],
    specifications: {
      Material: "100% Organic Cotton",
      Care: "Machine Wash Cold",
      Fit: "Regular",
      Origin: "Ethically Made",
    },
    tags: ["clothing", "t-shirt", "organic", "fashion"],
    rating: 4.8,
    reviewCount: 42,
    salesCount: 95,
  },
  {
    id: "prod5",
    sellerId: "seller1",
    name: "Smart Home Security Camera",
    description:
      "HD security camera with motion detection, night vision, and two-way audio. Easy to set up and monitor from your smartphone.",
    price: 79.99,
    images: [
      "/placeholder.svg?height=500&width=500&text=Camera+Front",
      "/placeholder.svg?height=500&width=500&text=Camera+Side",
      "/placeholder.svg?height=500&width=500&text=Camera+App",
    ],
    categoryId: "cat1",
    stock: 5,
    sku: "SHC-005",
    status: "draft",
    featured: false,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    specifications: {
      Resolution: "1080p HD",
      "Field of View": "130°",
      "Night Vision": "Up to 30ft",
      Storage: "Cloud + Local SD",
      Connectivity: "Wi-Fi 2.4GHz",
    },
    tags: ["security", "camera", "smart home", "wifi"],
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
  },
]

export function getSellerProducts(sellerId: string, filters?: ProductFilters): SellerProduct[] {
  let products = mockSellerProducts.filter((product) => product.sellerId === sellerId)

  if (filters) {
    // Filter by status
    if (filters.status && filters.status !== "all") {
      products = products.filter((product) => product.status === filters.status)
    }

    // Filter by category
    if (filters.category) {
      products = products.filter((product) => product.categoryId === filters.category)
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.sku.toLowerCase().includes(searchTerm) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
    }

    // Filter by featured
    if (filters.featured !== undefined) {
      products = products.filter((product) => product.featured === filters.featured)
    }

    // Sort products
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "newest":
          products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          break
        case "oldest":
          products.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          break
        case "price_high":
          products.sort((a, b) => b.price - a.price)
          break
        case "price_low":
          products.sort((a, b) => a.price - b.price)
          break
        case "bestselling":
          products.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
          break
      }
    }
  }

  return products
}

export function getSellerProductById(productId: string): SellerProduct | undefined {
  return mockSellerProducts.find((product) => product.id === productId)
}

export function getCategoryById(categoryId: string): ProductCategory | undefined {
  return productCategories.find((category) => category.id === categoryId)
}

export function getAllCategories(): ProductCategory[] {
  return productCategories
}

export function getSellerStats(sellerId: string): any {
  const products = getSellerProducts(sellerId)

  return {
    totalProducts: products.length,
    totalOrders: 45, // Mock data
    totalRevenue: 12580.75, // Mock data
    totalCustomers: 28, // Mock data
    productsByStatus: {
      active: products.filter((p) => p.status === "active").length,
      draft: products.filter((p) => p.status === "draft").length,
      out_of_stock: products.filter((p) => p.status === "out_of_stock").length,
      deleted: products.filter((p) => p.status === "deleted").length,
    },
  }
}
