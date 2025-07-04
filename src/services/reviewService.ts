import { api } from "./api"
import type { Review, ReviewStats } from "@/types/review"

const BASE_URL = "/reviews"

function parseReview(raw: any): Review {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
  }
}

// Lấy tất cả đánh giá theo sản phẩm
export async function getReviewsByProduct(productId: number): Promise<Review[]> {
  const res = await api.get<Review[]>(`${BASE_URL}`, {
    params: { productId },
  })
  return res.data.map(parseReview)
}

// Thêm review mới
export async function addReview(
  review: Omit<Review, "id" | "createdAt">
): Promise<Review> {
  const res = await api.post<Review>(BASE_URL, review)
  return parseReview(res.data)
}

// Cập nhật review (dùng cho edit, like, dislike, soft delete)
export async function updateReview(
  review: Partial<Review> & { id: string }
): Promise<Review> {
  const res = await api.patch<Review>(`${BASE_URL}/${review.id}`, review)
  return parseReview(res.data)
}

// Lấy thống kê đánh giá cho sản phẩm (average + distribution)
export async function getReviewStats(productId: number): Promise<ReviewStats> {
  const res = await api.get<ReviewStats>(`${BASE_URL}/stats`, {
    params: { productId },
  })
  return res.data
}

// Lấy review của người dùng cụ thể cho sản phẩm
export async function getUserReview(
  productId: number,
  userId: string
): Promise<Review | null> {
  try {
    const res = await api.get<Review | null>(`${BASE_URL}/user`, {
      params: { productId, userId },
    })
    return res.data ? parseReview(res.data) : null
  } catch (error: any) {
    if (error.response?.status === 404) return null
    throw new Error("Failed to fetch user review")
  }
}
