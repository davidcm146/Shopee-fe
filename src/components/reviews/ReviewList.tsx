"use client"

import { useState, useMemo } from "react"
import { ReviewItem } from "./ReviewItem"
import { ReviewFilters } from "./ReviewFilters"
import type { Review, ReviewFilters as ReviewFiltersType } from "../../types/review"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

interface ReviewListProps {
  reviews: Review[]
  currentUserId?: string
}

export function ReviewList({ reviews, currentUserId }: ReviewListProps) {
  const [filters, setFilters] = useState<ReviewFiltersType>({
    rating: 0, // 0 = all ratings
    sortBy: "newest",
  })

  const filteredAndSortedReviews = useMemo(() => {
    // Start with non-deleted reviews only
    let filtered = reviews.filter((review: Review) => !review.isDeleted)

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter((review: Review) => review.rating === filters.rating)
    }

    // Sort reviews
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a: Review, b: Review) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a: Review, b: Review) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "rating_high":
        filtered.sort((a: Review, b: Review) => b.rating - a.rating)
        break
      case "rating_low":
        filtered.sort((a: Review, b: Review) => a.rating - b.rating)
        break
      case "most_liked":
        filtered.sort((a: Review, b: Review) => b.likeViews - a.likeViews)
        break
      case "most_disliked":
        filtered.sort((a: Review, b: Review) => b.dislikeViews - a.dislikeViews)
        break
    }

    return filtered
  }, [reviews, filters])

  // Calculate rating counts for filter buttons (excluding deleted reviews)
  const ratingCounts = useMemo(() => {
    const activeReviews = reviews.filter((review: Review) => !review.isDeleted)
    const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    activeReviews.forEach((review: Review) => {
      counts[review.rating] = (counts[review.rating] || 0) + 1
    })
    return counts
  }, [reviews])

  const activeReviewsCount = reviews.filter((review: Review) => !review.isDeleted).length

  // Show message when no reviews exist at all
  if (activeReviewsCount === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <FontAwesomeIcon icon={faStar} className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
        <p className="text-muted-foreground mb-6">Be the first to share your thoughts about this product.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Always show filters if there are reviews */}
      <ReviewFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalReviews={activeReviewsCount}
        ratingCounts={ratingCounts}
      />

      <div className="space-y-6">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reviews found for the selected filters.</p>
            <button
              onClick={() => setFilters({ rating: 0, sortBy: "newest" })}
              className="text-orange-500 hover:text-orange-600 text-sm mt-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredAndSortedReviews.map((review: Review) => (
            <ReviewItem key={review.id} review={review} currentUserId={currentUserId} />
          ))
        )}
      </div>
    </div>
  )
}
