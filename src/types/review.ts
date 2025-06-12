export interface Review {
  reviewId: string
  userId: string
  productId: number // Using number to match our existing product IDs
  rating: number // 1-5 stars
  comment: string
  createdAt: Date

  // Additional fields for UI display
  user?: {
    name: string
    avatar?: string
  }
  isOwned?: boolean // If the current user owns this review
}

export interface CreateReviewRequest {
  userId: string
  productId: number
  rating: number
  comment: string
}

export interface UpdateReviewRequest {
  reviewId: string
  rating: number
  comment: string
}

export interface ReviewFilters {
  rating: number // 0 = all, 1-5 = specific rating
  sortBy: "newest" | "oldest" | "rating_high" | "rating_low"
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}
