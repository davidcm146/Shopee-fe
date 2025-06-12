"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Review, CreateReviewRequest, UpdateReviewRequest } from "../types/review"
import { mockReviews } from "../data/review"

interface ReviewState {
  reviews: Review[]
  isLoading: boolean
  error: string | null
}

type ReviewAction =
  | { type: "SET_REVIEWS"; payload: Review[] }
  | { type: "ADD_REVIEW"; payload: Review }
  | { type: "UPDATE_REVIEW"; payload: Review }
  | { type: "DELETE_REVIEW"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }

const initialState: ReviewState = {
  reviews: [],
  isLoading: false,
  error: null,
}

// Simple ID generation function
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function reviewReducer(state: ReviewState, action: ReviewAction): ReviewState {
  switch (action.type) {
    case "SET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
        isLoading: false,
      }

    case "ADD_REVIEW":
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
      }

    case "UPDATE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.map((review) => (review.reviewId === action.payload.reviewId ? action.payload : review)),
      }

    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.reviewId !== action.payload),
      }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

interface ReviewContextType {
  state: ReviewState
  createReview: (reviewData: CreateReviewRequest) => Promise<Review>
  updateReview: (reviewData: UpdateReviewRequest) => Promise<void>
  deleteReview: (reviewId: string) => Promise<void>
  getReviewsByProductId: (productId: number) => Review[]
  getUserReviews: (userId: string) => Review[]
  hasUserReviewed: (userId: string, productId: number) => boolean
  getUserReviewForProduct: (userId: string, productId: number) => Review | undefined
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reviewReducer, initialState)

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem("shopee-reviews")
    if (savedReviews) {
      try {
        const reviewsData = JSON.parse(savedReviews)
        // Convert string dates back to Date objects
        const reviews = reviewsData.map((review: any) => ({
          ...review,
          createdAt: new Date(review.createdAt),
        }))
        dispatch({ type: "SET_REVIEWS", payload: reviews })
      } catch (error) {
        console.error("Failed to load reviews from localStorage:", error)
        // Fallback to mock data
        dispatch({ type: "SET_REVIEWS", payload: mockReviews })
      }
    } else {
      // Initialize with mock data
      dispatch({ type: "SET_REVIEWS", payload: mockReviews })
    }
  }, [])

  // Save reviews to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("shopee-reviews", JSON.stringify(state.reviews))
  }, [state.reviews])

  const createReview = async (reviewData: CreateReviewRequest): Promise<Review> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newReview: Review = {
        reviewId: generateId(),
        userId: reviewData.userId,
        productId: reviewData.productId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        createdAt: new Date(),
        user: {
          name: "You", // In a real app, this would come from user context
          avatar: "/placeholder.svg?height=40&width=40&text=YU",
        },
        isOwned: true,
      }

      dispatch({ type: "ADD_REVIEW", payload: newReview })
      dispatch({ type: "SET_LOADING", payload: false })

      return newReview
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create review" })
      throw error
    }
  }

  const updateReview = async (reviewData: UpdateReviewRequest): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const existingReview = state.reviews.find((r) => r.reviewId === reviewData.reviewId)
      if (!existingReview) {
        throw new Error("Review not found")
      }

      const updatedReview: Review = {
        ...existingReview,
        rating: reviewData.rating,
        comment: reviewData.comment,
      }

      dispatch({ type: "UPDATE_REVIEW", payload: updatedReview })
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update review" })
      throw error
    }
  }

  const deleteReview = async (reviewId: string): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      dispatch({ type: "DELETE_REVIEW", payload: reviewId })
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete review" })
      throw error
    }
  }

  const getReviewsByProductId = (productId: number): Review[] => {
    return state.reviews.filter((review) => review.productId === productId)
  }

  const getUserReviews = (userId: string): Review[] => {
    return state.reviews.filter((review) => review.userId === userId)
  }

  const hasUserReviewed = (userId: string, productId: number): boolean => {
    return state.reviews.some((review) => review.userId === userId && review.productId === productId)
  }

  const getUserReviewForProduct = (userId: string, productId: number): Review | undefined => {
    return state.reviews.find((review) => review.userId === userId && review.productId === productId)
  }

  return (
    <ReviewContext.Provider
      value={{
        state,
        createReview,
        updateReview,
        deleteReview,
        getReviewsByProductId,
        getUserReviews,
        hasUserReviewed,
        getUserReviewForProduct,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export function useReview() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error("useReview must be used within a ReviewProvider")
  }
  return context
}
