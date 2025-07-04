export interface Review {
  id: string
  userId: string
  productId: string // Using number to match our existing product IDs
  rating: number // 1-5 stars
  comment: string
  video?: string
  image?: string
  isDeleted: boolean
  likeViews: number
  dislikeViews: number
  createdAt: Date
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
  sortBy: "newest" | "oldest" | "rating_high" | "rating_low" | "most_liked" | "most_disliked"
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
