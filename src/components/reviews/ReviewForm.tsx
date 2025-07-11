"use client"

import type React from "react"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faPaperPlane, faImage, faVideo } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { addReview } from "../../data/review"
import type { Review } from "../../types/review"

interface ReviewFormProps {
  productId: string
  onSuccess?: () => void
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [image, setImage] = useState("")
  const [video, setVideo] = useState("")
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
      const newReview: Omit<Review, "id" | "createdAt"> = {
        userId: "guest-user",
        productId: productId,
        rating: rating,
        comment: comment.trim(),
        video: video.trim() || undefined,
        image: image.trim() || undefined,
        isDeleted: false,
        likeViews: 0,
        dislikeViews: 0,
      }

      await addReview(newReview)

      // Reset form
      setRating(0)
      setComment("")
      setImage("")
      setVideo("")
      onSuccess?.()

      // Refresh the page to show the new review
      window.location.reload()
    } catch (error) {
      console.error("Failed to submit review:", error)
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
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
                    className={`h-6 w-6 ${star <= (hoveredRating || rating) ? "text-yellow-400" : "text-gray-300"}`}
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
              className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              maxLength={1000}
              required
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">Minimum 10 characters</span>
              <span className="text-xs text-muted-foreground">{comment.length}/1000</span>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <FontAwesomeIcon icon={faImage} className="h-4 w-4 mr-1" />
              Image URL (optional)
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <FontAwesomeIcon icon={faVideo} className="h-4 w-4 mr-1" />
              Video URL (optional)
            </label>
            <input
              type="url"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600"
            disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
