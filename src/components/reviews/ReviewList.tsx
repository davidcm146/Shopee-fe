"use client"

import { useState, useMemo } from "react"
import { ReviewItem } from "./ReviewItem"
import { ReviewFilters } from "./ReviewFilters"
import type { Review, ReviewFilters as ReviewFiltersType } from "../../types/review"

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
    let filtered = [...reviews]

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter((review) => review.rating === filters.rating)
    }

    // Sort reviews
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "rating_high":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "rating_low":
        filtered.sort((a, b) => a.rating - b.rating)
        break
    }

    return filtered
  }, [reviews, filters])

  // Calculate rating counts for filter buttons
  const ratingCounts = useMemo(() => {
    const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.forEach((review) => {
      counts[review.rating] = (counts[review.rating] || 0) + 1
    })
    return counts
  }, [reviews])

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet.</p>
      </div>
    )
  }

  return (
    <div>
      <ReviewFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalReviews={reviews.length}
        ratingCounts={ratingCounts}
      />

      <div className="space-y-6">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reviews found for the selected filters.</p>
          </div>
        ) : (
          filteredAndSortedReviews.map((review) => (
            <ReviewItem key={review.reviewId} review={review} currentUserId={currentUserId} />
          ))
        )}
      </div>
    </div>
  )
}
