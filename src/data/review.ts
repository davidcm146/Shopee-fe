import type { Review } from "../types/review"

// Sample reviews data that will be displayed immediately
const reviewsData: Review[] = [
  // Smartphone X Pro (Product ID: 1)
  {
    id: "rev_001",
    userId: "user_001",
    productId: 1,
    rating: 5,
    comment:
      "Absolutely amazing phone! The camera quality is outstanding and the 5G speed is incredible. Best purchase I've made this year.",
    image: "https://example.com/review-images/smartphone-photo.jpg",
    isDeleted: false,
    likeViews: 45,
    dislikeViews: 2,
    createdAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "rev_002",
    userId: "user_002",
    productId: 1,
    rating: 4,
    comment:
      "Great phone overall. Battery life could be better but the display is gorgeous. The triple camera system works really well in low light.",
    isDeleted: false,
    likeViews: 23,
    dislikeViews: 1,
    createdAt: new Date("2024-01-20T14:15:00Z"),
  },
  {
    id: "rev_003",
    userId: "user_003",
    productId: 1,
    rating: 5,
    comment:
      "Perfect for photography enthusiasts! The 108MP camera captures incredible detail. Fast charging is a game changer.",
    video: "https://example.com/review-videos/smartphone-demo.mp4",
    isDeleted: false,
    likeViews: 67,
    dislikeViews: 0,
    createdAt: new Date("2024-02-01T09:45:00Z"),
  },

  // Wireless Headphones (Product ID: 2)
  {
    id: "rev_004",
    userId: "user_004",
    productId: 2,
    rating: 5,
    comment:
      "These headphones are incredible! The noise cancellation is so good I can't hear anything around me. Perfect for flights and commuting.",
    isDeleted: false,
    likeViews: 89,
    dislikeViews: 1,
    createdAt: new Date("2024-01-25T11:00:00Z"),
  },
  {
    id: "rev_005",
    userId: "user_005",
    productId: 2,
    rating: 4,
    comment:
      "Great sound quality and comfortable to wear for hours. The 30-hour battery life is exactly as advertised.",
    image: "https://example.com/review-images/headphones-comfort.jpg",
    isDeleted: false,
    likeViews: 34,
    dislikeViews: 2,
    createdAt: new Date("2024-02-05T13:30:00Z"),
  },

  // Men's Casual Shirt (Product ID: 3)
  {
    id: "rev_006",
    userId: "user_006",
    productId: 3,
    rating: 5,
    comment:
      "Perfect fit and great quality cotton. The shirt feels premium and looks great both casual and semi-formal settings.",
    isDeleted: false,
    likeViews: 12,
    dislikeViews: 0,
    createdAt: new Date("2024-01-30T15:45:00Z"),
  },

  // Smart Home Speaker (Product ID: 4)
  {
    id: "rev_007",
    userId: "user_007",
    productId: 4,
    rating: 5,
    comment:
      "This speaker has transformed my home! The voice control works perfectly and the sound quality is amazing for the size.",
    video: "https://example.com/review-videos/smart-speaker-demo.mp4",
    isDeleted: false,
    likeViews: 78,
    dislikeViews: 2,
    createdAt: new Date("2024-01-18T10:00:00Z"),
  },

  // Facial Cleanser Set (Product ID: 5)
  {
    id: "rev_008",
    userId: "user_008",
    productId: 5,
    rating: 5,
    comment:
      "This cleanser set is amazing! My skin has never looked better. Gentle yet effective, and I love that it's cruelty-free.",
    image: "https://example.com/review-images/skincare-results.jpg",
    isDeleted: false,
    likeViews: 92,
    dislikeViews: 0,
    createdAt: new Date("2024-01-22T16:45:00Z"),
  },

  // Running Shoes (Product ID: 6)
  {
    id: "rev_009",
    userId: "user_009",
    productId: 6,
    rating: 5,
    comment:
      "Best running shoes I've ever owned! The cushioning is perfect and they're incredibly lightweight. Great for long runs.",
    isDeleted: false,
    likeViews: 54,
    dislikeViews: 1,
    createdAt: new Date("2024-01-28T07:30:00Z"),
  },

  // Laptop Ultrabook (Product ID: 7)
  {
    id: "rev_010",
    userId: "user_010",
    productId: 7,
    rating: 5,
    comment:
      "Perfect laptop for work and travel! Super lightweight but powerful. The battery easily lasts a full workday.",
    video: "https://example.com/review-videos/laptop-performance.mp4",
    isDeleted: false,
    likeViews: 76,
    dislikeViews: 1,
    createdAt: new Date("2024-01-12T09:15:00Z"),
  },

  // Women's Handbag (Product ID: 8)
  {
    id: "rev_011",
    userId: "user_011",
    productId: 8,
    rating: 5,
    comment:
      "Beautiful handbag with excellent craftsmanship! The leather is high quality and the organization is perfect for daily use.",
    image: "https://example.com/review-images/handbag-style.jpg",
    isDeleted: false,
    likeViews: 29,
    dislikeViews: 0,
    createdAt: new Date("2024-01-31T12:00:00Z"),
  },
]

// Helper functions
export function getReviewsByProductId(productId: number): Review[] {
  return reviewsData.filter((review) => review.productId === productId)
}

export function calculateReviewStats(productId: number) {
  const productReviews = reviewsData.filter((review) => review.productId === productId && !review.isDeleted)

  if (productReviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    }
  }

  const totalReviews = productReviews.length
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / totalReviews

  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  productReviews.forEach((review) => {
    ratingDistribution[review.rating as keyof typeof ratingDistribution]++
  })

  return {
    totalReviews,
    averageRating,
    ratingDistribution,
  }
}

// Function to add a new review
export async function addReview(reviewData: Omit<Review, "id" | "createdAt">): Promise<Review> {
  const newReview: Review = {
    ...reviewData,
    id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
  }

  reviewsData.push(newReview)
  return newReview
}

// Function to update a review
export async function updateReview(reviewUpdate: Partial<Review>): Promise<Review | null> {
  const reviewIndex = reviewsData.findIndex((review) => review.id === reviewUpdate.id)

  if (reviewIndex === -1) {
    return null
  }

  reviewsData[reviewIndex] = { ...reviewsData[reviewIndex], ...reviewUpdate }
  return reviewsData[reviewIndex]
}

// Function to get all reviews
export function getAllReviews(): Review[] {
  return reviewsData
}
