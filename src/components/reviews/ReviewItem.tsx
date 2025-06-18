"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faThumbsUp, faThumbsDown, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Avatar } from "../ui/avatar"
import { Button } from "../ui/button"
import type { Review } from "../../types/review"
import { ReviewEditForm } from "./ReviewEditForm"
import { updateReview } from "../../data/review"

interface ReviewItemProps {
  review: Review
  currentUserId?: string
}

export function ReviewItem({ review, currentUserId }: ReviewItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [likes, setLikes] = useState(review.likeViews)
  const [dislikes, setDislikes] = useState(review.dislikeViews)
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null)

  const isOwned = currentUserId === review.userId
  const timeAgo = getTimeAgo(review.createdAt)

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setIsDeleting(true)
      try {
        // Soft delete by setting isDeleted to true
        const updatedReview: Partial<Review> = {
          id: review.id,
          isDeleted: true,
        }
        await updateReview(updatedReview)
        // Refresh the page to reflect changes
        window.location.reload()
      } catch (error) {
        console.error("Failed to delete review:", error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleLike = async () => {
    let newLikes = likes
    let newDislikes = dislikes

    if (userVote === "like") {
      // Remove like
      newLikes = likes - 1
      setUserVote(null)
    } else {
      // Add like, remove dislike if exists
      newLikes = likes + 1
      if (userVote === "dislike") {
        newDislikes = dislikes - 1
      }
      setUserVote("like")
    }

    setLikes(newLikes)
    setDislikes(newDislikes)

    // Update in data
    try {
      const updatedReview: Partial<Review> = {
        id: review.id,
        likeViews: newLikes,
        dislikeViews: newDislikes,
      }
      await updateReview(updatedReview)
    } catch (error) {
      console.error("Failed to update like:", error)
      // Revert on error
      setLikes(review.likeViews)
      setDislikes(review.dislikeViews)
      setUserVote(null)
    }
  }

  const handleDislike = async () => {
    let newLikes = likes
    let newDislikes = dislikes

    if (userVote === "dislike") {
      // Remove dislike
      newDislikes = dislikes - 1
      setUserVote(null)
    } else {
      // Add dislike, remove like if exists
      newDislikes = dislikes + 1
      if (userVote === "like") {
        newLikes = likes - 1
      }
      setUserVote("dislike")
    }

    setLikes(newLikes)
    setDislikes(newDislikes)

    // Update in data
    try {
      const updatedReview: Partial<Review> = {
        id: review.id,
        likeViews: newLikes,
        dislikeViews: newDislikes,
      }
      await updateReview(updatedReview)
    } catch (error) {
      console.error("Failed to update dislike:", error)
      // Revert on error
      setLikes(review.likeViews)
      setDislikes(review.dislikeViews)
      setUserVote(null)
    }
  }

  if (isEditing) {
    return <ReviewEditForm review={review} onCancel={() => setIsEditing(false)} onSuccess={() => setIsEditing(false)} />
  }

  return (
    <div className="border-b pb-6 last:border-b-0">
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10">
          <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" className="w-full h-full object-cover" />
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">User {review.userId}</span>
                {isOwned && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Your Review</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`h-3 w-3 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{timeAgo}</span>
              </div>
            </div>
            {isOwned && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <FontAwesomeIcon icon={faEdit} className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <FontAwesomeIcon icon={faTrash} className="h-3 w-3 mr-1" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            )}
          </div>

          <p className="text-muted-foreground mb-3 leading-relaxed">{review.comment}</p>

          {/* Media Content */}
          {(review.image || review.video) && (
            <div className="mb-3">
              {review.image && (
                <div className="mb-2">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt="Review image"
                    className="max-w-xs rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              )}
              {review.video && (
                <div className="mb-2">
                  <video
                    src={review.video}
                    controls
                    className="max-w-xs rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          )}

          {/* Like/Dislike Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                userVote === "like"
                  ? "text-green-600 hover:text-green-700"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FontAwesomeIcon icon={faThumbsUp} className="h-3 w-3" />
              <span>{likes}</span>
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                userVote === "dislike"
                  ? "text-red-600 hover:text-red-700"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FontAwesomeIcon icon={faThumbsDown} className="h-3 w-3" />
              <span>{dislikes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}
