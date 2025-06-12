"use client"

import type React from "react"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faSave, faTimes } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useReview } from "../../context/ReviewContext"
import type { Review, UpdateReviewRequest } from "../../types/review"

interface ReviewEditFormProps {
  review: Review
  onCancel: () => void
  onSuccess: () => void
}

export function ReviewEditForm({ review, onCancel, onSuccess }: ReviewEditFormProps) {
  const { updateReview, state } = useReview()
  const [rating, setRating] = useState(review.rating)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState(review.comment)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    if (comment.trim().length < 10) {
      alert("Please write a review with at least 10 characters")
      return
    }

    setIsSubmitting(true)

    try {
      const updateData: UpdateReviewRequest = {
        reviewId: review.reviewId,
        rating,
        comment: comment.trim(),
      }

      await updateReview(updateData)
      onSuccess()
    } catch (error) {
      console.error("Failed to update review:", error)
      alert("Failed to update review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-orange-200">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Rating *</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`h-5 w-5 ${star <= (hoveredRating || rating) ? "text-yellow-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium mb-2">Your Review *</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              maxLength={1000}
              required
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">Minimum 10 characters</span>
              <span className="text-xs text-muted-foreground">{comment.length}/1000</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              disabled={isSubmitting || state.isLoading || rating === 0 || comment.trim().length < 10}
            >
              <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              <FontAwesomeIcon icon={faTimes} className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
