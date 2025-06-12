"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faEdit, faTrash, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { Avatar } from "../ui/avatar"
import { useReview } from "../../context/ReviewContext"
import { ReviewEditForm } from "./ReviewEditForm"
import type { Review } from "../../types/review"

interface ReviewItemProps {
  review: Review
  currentUserId?: string
}

export function ReviewItem({ review, currentUserId }: ReviewItemProps) {
  const { deleteReview } = useReview()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [helpful, setHelpful] = useState(0)

  const isOwned = currentUserId === review.userId
  const timeAgo = getTimeAgo(review.createdAt)

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setIsDeleting(true)
      try {
        await deleteReview(review.reviewId)
      } catch (error) {
        console.error("Failed to delete review:", error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleHelpful = () => {
    setHelpful(helpful + 1)
  }

  if (isEditing) {
    return <ReviewEditForm review={review} onCancel={() => setIsEditing(false)} onSuccess={() => setIsEditing(false)} />
  }

  return (
    <div className="border-b pb-6 last:border-b-0">
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10">
          <img
            src={review.user?.avatar || "/placeholder.svg"}
            alt={review.user?.name || "User"}
            className="w-full h-full object-cover"
          />
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{review.user?.name || "Anonymous"}</span>
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
          <button
            onClick={handleHelpful}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <FontAwesomeIcon icon={faThumbsUp} className="h-3 w-3" />
            Helpful ({helpful})
          </button>
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
