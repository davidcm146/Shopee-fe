import type { Review } from "../types/review"

// Simple ID generation function
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Mock users for reviews
const mockUsers = [
  { id: "user1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40&text=JD" },
  { id: "user2", name: "Sarah Smith", avatar: "/placeholder.svg?height=40&width=40&text=SS" },
  { id: "user3", name: "Mike Johnson", avatar: "/placeholder.svg?height=40&width=40&text=MJ" },
  { id: "user4", name: "Emily Brown", avatar: "/placeholder.svg?height=40&width=40&text=EB" },
  { id: "user5", name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40&text=DW" },
  { id: "guest-user", name: "You", avatar: "/placeholder.svg?height=40&width=40&text=YU" },
]

export const mockReviews: Review[] = [
  {
    reviewId: generateId(),
    userId: "user1",
    productId: 1,
    rating: 5,
    comment:
      "Excellent product! Exactly as described and fast shipping. The quality is outstanding and it works perfectly. Highly recommended!",
    createdAt: new Date("2024-01-15"),
    user: mockUsers[0],
  },
  {
    reviewId: generateId(),
    userId: "user2",
    productId: 1,
    rating: 4,
    comment: "Good quality product, but delivery took longer than expected. Overall satisfied with the purchase.",
    createdAt: new Date("2024-01-10"),
    user: mockUsers[1],
  },
  {
    reviewId: generateId(),
    userId: "user3",
    productId: 1,
    rating: 5,
    comment: "Amazing value for money. Works great and looks exactly like the pictures. Will buy again!",
    createdAt: new Date("2024-01-05"),
    user: mockUsers[2],
  },
  {
    reviewId: generateId(),
    userId: "user4",
    productId: 1,
    rating: 3,
    comment: "Product is okay, but not as good as I expected. The build quality could be better.",
    createdAt: new Date("2024-01-01"),
    user: mockUsers[3],
  },
  {
    reviewId: generateId(),
    userId: "user5",
    productId: 1,
    rating: 4,
    comment:
      "Good product overall. Easy to use and good value. Minor issues with packaging but product arrived safely.",
    createdAt: new Date("2023-12-28"),
    user: mockUsers[4],
  },
  // Add reviews for other products
  {
    reviewId: generateId(),
    userId: "user1",
    productId: 2,
    rating: 5,
    comment: "Best headphones I've ever owned! Sound quality is incredible and noise cancellation works perfectly.",
    createdAt: new Date("2024-01-12"),
    user: mockUsers[0],
  },
  {
    reviewId: generateId(),
    userId: "user2",
    productId: 2,
    rating: 4,
    comment: "Great sound quality and comfortable to wear for long periods. Battery life is excellent.",
    createdAt: new Date("2024-01-08"),
    user: mockUsers[1],
  },
]

export function getReviewsByProductId(productId: number): Review[] {
  return mockReviews.filter((review) => review.productId === productId)
}

export function getReviewById(reviewId: string): Review | undefined {
  return mockReviews.find((review) => review.reviewId === reviewId)
}

export function getUserReviews(userId: string): Review[] {
  return mockReviews.filter((review) => review.userId === userId)
}

export function calculateReviewStats(productId: number) {
  const reviews = getReviewsByProductId(productId)
  const totalReviews = reviews.length

  if (totalReviews === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    }
  }

  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let totalRating = 0

  reviews.forEach((review) => {
    totalRating += review.rating
    ratingDistribution[review.rating as keyof typeof ratingDistribution]++
  })

  return {
    totalReviews,
    averageRating: totalRating / totalReviews,
    ratingDistribution,
  }
}
