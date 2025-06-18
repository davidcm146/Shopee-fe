"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { ReviewForm } from "../reviews/ReviewForm"
import { ReviewStats } from "../reviews/ReviewStats"
import { ReviewList } from "../reviews/ReviewList"
import { getReviewsByProductId, calculateReviewStats } from "../../data/reviews"
import type { Review } from "../../types/review"

interface ProductReviewsProps {
  productId: number
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)

  const currentUserId = "guest-user" // In a real app, this would come from auth context
  const allReviews = getReviewsByProductId(productId)

  // Filter out deleted reviews for display
  const activeReviews = allReviews.filter((review: Review) => !review.isDeleted)
  const stats = calculateReviewStats(productId)

  // Check if user has already reviewed this product
  const userHasReviewed = activeReviews.some((review) => review.userId === currentUserId)
  const userReview = activeReviews.find((review) => review.userId === currentUserId)

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

      {/* Review Stats - Always show if there are reviews */}
      {activeReviews.length > 0 && (
        <div className="mb-6">
          <ReviewStats stats={stats} />
        </div>
      )}

      {/* Review Form - Only show when user clicks "Write a Review" */}
      {showReviewForm && !userHasReviewed && (
        <div className="mb-6">
          <ReviewForm productId={productId} onSuccess={() => setShowReviewForm(false)} />
        </div>
      )}

      {/* User's existing review notice */}
      {userHasReviewed && userReview && !userReview.isDeleted && (
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

      {/* Reviews List - Always show, even if user hasn't written a review */}
      <ReviewList reviews={activeReviews} currentUserId={currentUserId} />
    </div>
  )
}
