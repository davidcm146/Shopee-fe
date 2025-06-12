"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { ReviewStats } from "../reviews/ReviewStats"
import { ReviewForm } from "../reviews/ReviewForm"
import { ReviewList } from "../reviews/ReviewList"
import { useReview } from "../../context/ReviewContext"
import { calculateReviewStats } from "../../data/review"

interface ProductReviewsProps {
  productId: number
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { getReviewsByProductId, hasUserReviewed, getUserReviewForProduct } = useReview()
  const [showReviewForm, setShowReviewForm] = useState(false)

  const currentUserId = "guest-user" // In a real app, this would come from auth context
  const reviews = getReviewsByProductId(productId)
  const stats = calculateReviewStats(productId)
  const userHasReviewed = hasUserReviewed(currentUserId, productId)
  const userReview = getUserReviewForProduct(currentUserId, productId)

  // Mark user's own review
  const reviewsWithOwnership = reviews.map((review) => ({
    ...review,
    isOwned: review.userId === currentUserId,
  }))

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        {!userHasReviewed && (
          <Button onClick={() => setShowReviewForm(!showReviewForm)} className="bg-orange-500 hover:bg-orange-600">
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Stats */}
      <div className="mb-6">
        <ReviewStats stats={stats} />
      </div>

      {/* Review Form */}
      {showReviewForm && !userHasReviewed && (
        <div className="mb-6">
          <ReviewForm productId={productId} onSuccess={() => setShowReviewForm(false)} />
        </div>
      )}

      {/* User's existing review notice */}
      {userHasReviewed && userReview && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-orange-500" />
            <span className="font-medium">You've already reviewed this product</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You can edit or delete your review below. Only one review per product is allowed.
          </p>
        </div>
      )}

      {/* Reviews List */}
      <ReviewList reviews={reviewsWithOwnership} currentUserId={currentUserId} />
    </div>
  )
}
