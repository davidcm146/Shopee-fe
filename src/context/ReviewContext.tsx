// "use client"

// import type React from "react"
// import { createContext, useContext, useReducer, useEffect } from "react"
// import type { Review } from "../types/review"
// import { mockReviews } from "../data/review"

// interface ReviewState {
//   reviews: Review[]
//   isLoading: boolean
//   error: string | null
// }

// type ReviewAction =
//   | { type: "SET_REVIEWS"; payload: Review[] }
//   | { type: "ADD_REVIEW"; payload: Review }
//   | { type: "UPDATE_REVIEW"; payload: Review }
//   | { type: "DELETE_REVIEW"; payload: string }
//   | { type: "SET_LOADING"; payload: boolean }
//   | { type: "SET_ERROR"; payload: string }

// const initialState: ReviewState = {
//   reviews: [],
//   isLoading: false,
//   error: null,
// }

// function generateId(): string {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2)
// }

// function reviewReducer(state: ReviewState, action: ReviewAction): ReviewState {
//   switch (action.type) {
//     case "SET_REVIEWS":
//       return { ...state, reviews: action.payload, isLoading: false }
//     case "ADD_REVIEW":
//       return { ...state, reviews: [action.payload, ...state.reviews] }
//     case "UPDATE_REVIEW":
//       return {
//         ...state,
//         reviews: state.reviews.map((r) => (r.id === action.payload.id ? action.payload : r)),
//       }
//     case "DELETE_REVIEW":
//       return {
//         ...state,
//         reviews: state.reviews.filter((r) => r.id !== action.payload),
//       }
//     case "SET_LOADING":
//       return { ...state, isLoading: action.payload }
//     case "SET_ERROR":
//       return { ...state, error: action.payload, isLoading: false }
//     default:
//       return state
//   }
// }

// interface ReviewContextType {
//   state: ReviewState
//   createReview: (reviewData: Omit<Review, "id" | "isDeleted" | "likeViews" | "dislikeViews" | "createdAt">) => Promise<Review>
//   updateReview: (reviewId: string, updatedFields: Partial<Omit<Review, "id" | "userId" | "productId" | "createdAt">>) => Promise<void>
//   deleteReview: (reviewId: string) => Promise<void>
//   getReviewsByProductId: (productId: number) => Review[]
//   getUserReviews: (userId: string) => Review[]
//   hasUserReviewed: (userId: string, productId: number) => boolean
//   getUserReviewForProduct: (userId: string, productId: number) => Review | undefined
// }

// const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

// export function ReviewProvider({ children }: { children: React.ReactNode }) {
//   const [state, dispatch] = useReducer(reviewReducer, initialState)

//   useEffect(() => {
//     const savedReviews = localStorage.getItem("shopee-reviews")
//     if (savedReviews) {
//       try {
//         const reviewsData = JSON.parse(savedReviews)
//         const reviews = reviewsData.map((review: any) => ({
//           ...review,
//           createdAt: new Date(review.createdAt),
//         }))
//         dispatch({ type: "SET_REVIEWS", payload: reviews })
//       } catch (error) {
//         console.error("Failed to load reviews:", error)
//         dispatch({ type: "SET_REVIEWS", payload: mockReviews })
//       }
//     } else {
//       dispatch({ type: "SET_REVIEWS", payload: mockReviews })
//     }
//   }, [])

//   useEffect(() => {
//     localStorage.setItem("shopee-reviews", JSON.stringify(state.reviews))
//   }, [state.reviews])

//   const createReview = async (
//     reviewData: Omit<Review, "id" | "isDeleted" | "likeViews" | "dislikeViews" | "createdAt">
//   ): Promise<Review> => {
//     dispatch({ type: "SET_LOADING", payload: true })
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500))

//       const newReview: Review = {
//         id: generateId(),
//         ...reviewData,
//         isDeleted: false,
//         likeViews: 0,
//         dislikeViews: 0,
//         createdAt: new Date(),
//       }

//       dispatch({ type: "ADD_REVIEW", payload: newReview })
//       dispatch({ type: "SET_LOADING", payload: false })
//       return newReview
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: "Failed to create review" })
//       throw error
//     }
//   }

//   const updateReview = async (
//     reviewId: string,
//     updatedFields: Partial<Omit<Review, "id" | "userId" | "productId" | "createdAt">>
//   ): Promise<void> => {
//     dispatch({ type: "SET_LOADING", payload: true })
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 300))

//       const existingReview = state.reviews.find((r) => r.id === reviewId)
//       if (!existingReview) throw new Error("Review not found")

//       const updatedReview: Review = {
//         ...existingReview,
//         ...updatedFields,
//       }

//       dispatch({ type: "UPDATE_REVIEW", payload: updatedReview })
//       dispatch({ type: "SET_LOADING", payload: false })
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: "Failed to update review" })
//       throw error
//     }
//   }

//   const deleteReview = async (reviewId: string): Promise<void> => {
//     dispatch({ type: "SET_LOADING", payload: true })
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 300))
//       dispatch({ type: "DELETE_REVIEW", payload: reviewId })
//       dispatch({ type: "SET_LOADING", payload: false })
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: "Failed to delete review" })
//       throw error
//     }
//   }

//   const getReviewsByProductId = (productId: number): Review[] =>
//     state.reviews.filter((r) => r.productId === productId && !r.isDeleted)

//   const getUserReviews = (userId: string): Review[] =>
//     state.reviews.filter((r) => r.userId === userId && !r.isDeleted)

//   const hasUserReviewed = (userId: string, productId: number): boolean =>
//     state.reviews.some((r) => r.userId === userId && r.productId === productId && !r.isDeleted)

//   const getUserReviewForProduct = (userId: string, productId: number): Review | undefined =>
//     state.reviews.find((r) => r.userId === userId && r.productId === productId && !r.isDeleted)

//   return (
//     <ReviewContext.Provider
//       value={{
//         state,
//         createReview,
//         updateReview,
//         deleteReview,
//         getReviewsByProductId,
//         getUserReviews,
//         hasUserReviewed,
//         getUserReviewForProduct,
//       }}
//     >
//       {children}
//     </ReviewContext.Provider>
//   )
// }

// export function useReview() {
//   const context = useContext(ReviewContext)
//   if (!context) throw new Error("useReview must be used within a ReviewProvider")
//   return context
// }
