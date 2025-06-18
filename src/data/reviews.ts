import type { Review } from "../types/review"

export const mockReviews: Review[] = [
  // Smartphone X Pro (Product ID: 1) - 1245 reviews, 4.8 rating
  {
    id: "rev_001",
    userId: "user_001",
    productId: 1,
    rating: 5,
    comment: "Absolutely amazing phone! The camera quality is outstanding and the 5G speed is incredible. Best purchase I've made this year.",
    image: "https://example.com/review-images/smartphone-photo.jpg",
    isDeleted: false,
    likeViews: 45,
    dislikeViews: 2,
    createdAt: new Date("2024-01-15T10:30:00Z")
  },
  {
    id: "rev_002",
    userId: "user_002",
    productId: 1,
    rating: 4,
    comment: "Great phone overall. Battery life could be better but the display is gorgeous. The triple camera system works really well in low light.",
    isDeleted: false,
    likeViews: 23,
    dislikeViews: 1,
    createdAt: new Date("2024-01-20T14:15:00Z")
  },
  {
    id: "rev_003",
    userId: "user_003",
    productId: 1,
    rating: 5,
    comment: "Perfect for photography enthusiasts! The 108MP camera captures incredible detail. Fast charging is a game changer.",
    video: "https://example.com/review-videos/smartphone-demo.mp4",
    isDeleted: false,
    likeViews: 67,
    dislikeViews: 0,
    createdAt: new Date("2024-02-01T09:45:00Z")
  },
  {
    id: "rev_004",
    userId: "user_004",
    productId: 1,
    rating: 4,
    comment: "Solid performance and build quality. The OLED display is vibrant and the 120Hz refresh rate makes everything smooth.",
    isDeleted: false,
    likeViews: 18,
    dislikeViews: 3,
    createdAt: new Date("2024-02-10T16:20:00Z")
  },

  // Wireless Headphones (Product ID: 2) - 856 reviews, 4.7 rating
  {
    id: "rev_005",
    userId: "user_005",
    productId: 2,
    rating: 5,
    comment: "These headphones are incredible! The noise cancellation is so good I can't hear anything around me. Perfect for flights and commuting.",
    isDeleted: false,
    likeViews: 89,
    dislikeViews: 1,
    createdAt: new Date("2024-01-25T11:00:00Z")
  },
  {
    id: "rev_006",
    userId: "user_006",
    productId: 2,
    rating: 4,
    comment: "Great sound quality and comfortable to wear for hours. The 30-hour battery life is exactly as advertised.",
    image: "https://example.com/review-images/headphones-comfort.jpg",
    isDeleted: false,
    likeViews: 34,
    dislikeViews: 2,
    createdAt: new Date("2024-02-05T13:30:00Z")
  },
  {
    id: "rev_007",
    userId: "user_007",
    productId: 2,
    rating: 5,
    comment: "Best headphones I've ever owned. The ANC technology is amazing and the quick charge feature is super convenient.",
    isDeleted: false,
    likeViews: 56,
    dislikeViews: 0,
    createdAt: new Date("2024-02-12T08:15:00Z")
  },

  // Men's Casual Shirt (Product ID: 3) - 532 reviews, 4.5 rating
  {
    id: "rev_008",
    userId: "user_008",
    productId: 3,
    rating: 5,
    comment: "Perfect fit and great quality cotton. The shirt feels premium and looks great both casual and semi-formal settings.",
    isDeleted: false,
    likeViews: 12,
    dislikeViews: 0,
    createdAt: new Date("2024-01-30T15:45:00Z")
  },
  {
    id: "rev_009",
    userId: "user_009",
    productId: 3,
    rating: 4,
    comment: "Good quality shirt, true to size. The fabric is breathable and comfortable. Would recommend for everyday wear.",
    isDeleted: false,
    likeViews: 8,
    dislikeViews: 1,
    createdAt: new Date("2024-02-08T12:20:00Z")
  },
  {
    id: "rev_010",
    userId: "user_010",
    productId: 3,
    rating: 3,
    comment: "Decent shirt but the color faded slightly after a few washes. Still comfortable to wear though.",
    isDeleted: false,
    likeViews: 5,
    dislikeViews: 8,
    createdAt: new Date("2024-02-15T17:10:00Z")
  },

  // Smart Home Speaker (Product ID: 4) - 723 reviews, 4.6 rating
  {
    id: "rev_011",
    userId: "user_011",
    productId: 4,
    rating: 5,
    comment: "This speaker has transformed my home! The voice control works perfectly and the sound quality is amazing for the size.",
    video: "https://example.com/review-videos/smart-speaker-demo.mp4",
    isDeleted: false,
    likeViews: 78,
    dislikeViews: 2,
    createdAt: new Date("2024-01-18T10:00:00Z")
  },
  {
    id: "rev_012",
    userId: "user_012",
    productId: 4,
    rating: 4,
    comment: "Great smart home hub functionality. Easy to set up and the 360-degree sound fills the room nicely.",
    isDeleted: false,
    likeViews: 25,
    dislikeViews: 1,
    createdAt: new Date("2024-02-03T14:30:00Z")
  },
  {
    id: "rev_013",
    userId: "user_013",
    productId: 4,
    rating: 5,
    comment: "Love the multi-room audio feature! Can play music throughout the house seamlessly. The AI assistant is very responsive.",
    isDeleted: false,
    likeViews: 41,
    dislikeViews: 0,
    createdAt: new Date("2024-02-14T09:20:00Z")
  },

  // Facial Cleanser Set (Product ID: 5) - 412 reviews, 4.9 rating
  {
    id: "rev_014",
    userId: "user_014",
    productId: 5,
    rating: 5,
    comment: "This cleanser set is amazing! My skin has never looked better. Gentle yet effective, and I love that it's cruelty-free.",
    image: "https://example.com/review-images/skincare-results.jpg",
    isDeleted: false,
    likeViews: 92,
    dislikeViews: 0,
    createdAt: new Date("2024-01-22T16:45:00Z")
  },
  {
    id: "rev_015",
    userId: "user_015",
    productId: 5,
    rating: 5,
    comment: "Perfect for sensitive skin! No irritation and leaves my face feeling clean and hydrated. The 3-step routine is easy to follow.",
    isDeleted: false,
    likeViews: 67,
    dislikeViews: 1,
    createdAt: new Date("2024-02-07T11:15:00Z")
  },
  {
    id: "rev_016",
    userId: "user_016",
    productId: 5,
    rating: 4,
    comment: "Great product! Removes makeup completely and doesn't dry out my skin. The bottles are a good size and last a long time.",
    isDeleted: false,
    likeViews: 28,
    dislikeViews: 2,
    createdAt: new Date("2024-02-16T13:50:00Z")
  },

  // Running Shoes (Product ID: 6) - 678 reviews, 4.7 rating
  {
    id: "rev_017",
    userId: "user_017",
    productId: 6,
    rating: 5,
    comment: "Best running shoes I've ever owned! The cushioning is perfect and they're incredibly lightweight. Great for long runs.",
    isDeleted: false,
    likeViews: 54,
    dislikeViews: 1,
    createdAt: new Date("2024-01-28T07:30:00Z")
  },
  {
    id: "rev_018",
    userId: "user_018",
    productId: 6,
    rating: 4,
    comment: "Comfortable and well-made shoes. The breathable design keeps my feet cool during workouts. True to size.",
    image: "https://example.com/review-images/running-shoes-action.jpg",
    isDeleted: false,
    likeViews: 31,
    dislikeViews: 3,
    createdAt: new Date("2024-02-04T18:20:00Z")
  },
  {
    id: "rev_019",
    userId: "user_019",
    productId: 6,
    rating: 5,
    comment: "Excellent for daily running and gym workouts. The air cushioning technology really makes a difference in comfort.",
    isDeleted: false,
    likeViews: 43,
    dislikeViews: 0,
    createdAt: new Date("2024-02-11T06:45:00Z")
  },

  // Laptop Ultrabook (Product ID: 7) - 945 reviews, 4.8 rating
  {
    id: "rev_020",
    userId: "user_020",
    productId: 7,
    rating: 5,
    comment: "Perfect laptop for work and travel! Super lightweight but powerful. The battery easily lasts a full workday.",
    video: "https://example.com/review-videos/laptop-performance.mp4",
    isDeleted: false,
    likeViews: 76,
    dislikeViews: 1,
    createdAt: new Date("2024-01-12T09:15:00Z")
  },
  {
    id: "rev_021",
    userId: "user_021",
    productId: 7,
    rating: 4,
    comment: "Great performance for the price. The Intel i7 handles multitasking well and the SSD makes everything super fast.",
    isDeleted: false,
    likeViews: 38,
    dislikeViews: 2,
    createdAt: new Date("2024-01-26T14:40:00Z")
  },
  {
    id: "rev_022",
    userId: "user_022",
    productId: 7,
    rating: 5,
    comment: "Excellent build quality and the 14-inch display is perfect for productivity. Fast charging is a great feature.",
    isDeleted: false,
    likeViews: 52,
    dislikeViews: 0,
    createdAt: new Date("2024-02-09T11:30:00Z")
  },

  // Women's Handbag (Product ID: 8) - 321 reviews, 4.6 rating
  {
    id: "rev_023",
    userId: "user_023",
    productId: 8,
    rating: 5,
    comment: "Beautiful handbag with excellent craftsmanship! The leather is high quality and the organization is perfect for daily use.",
    image: "https://example.com/review-images/handbag-style.jpg",
    isDeleted: false,
    likeViews: 29,
    dislikeViews: 0,
    createdAt: new Date("2024-01-31T12:00:00Z")
  },
  {
    id: "rev_024",
    userId: "user_024",
    productId: 8,
    rating: 4,
    comment: "Stylish and practical bag. Fits all my essentials and the adjustable strap is convenient. Good value for money.",
    isDeleted: false,
    likeViews: 16,
    dislikeViews: 1,
    createdAt: new Date("2024-02-06T15:25:00Z")
  },
  {
    id: "rev_025",
    userId: "user_025",
    productId: 8,
    rating: 5,
    comment: "Love this handbag! The multiple compartments keep everything organized and the leather quality is outstanding.",
    isDeleted: false,
    likeViews: 33,
    dislikeViews: 2,
    createdAt: new Date("2024-02-13T10:10:00Z")
  },

  // Additional sample reviews with some deleted ones
  {
    id: "rev_026",
    userId: "user_026",
    productId: 1,
    rating: 2,
    comment: "This review contains inappropriate content and was deleted by moderation.",
    isDeleted: true,
    likeViews: 0,
    dislikeViews: 15,
    createdAt: new Date("2024-01-10T08:00:00Z")
  },
  {
    id: "rev_027",
    userId: "user_027",
    productId: 2,
    rating: 3,
    comment: "Decent headphones but had connectivity issues with my device. Customer service was helpful though.",
    isDeleted: false,
    likeViews: 7,
    dislikeViews: 12,
    createdAt: new Date("2024-02-17T19:30:00Z")
  },
  {
    id: "rev_028",
    userId: "user_028",
    productId: 4,
    rating: 5,
    comment: "Amazing smart speaker! The voice recognition is spot-on and it integrates perfectly with all my smart home devices.",
    isDeleted: false,
    likeViews: 61,
    dislikeViews: 1,
    createdAt: new Date("2024-02-18T14:15:00Z")
  }
]

// Helper function to get reviews by product ID
export function getReviewsByProductId(productId: number): Review[] {
  return mockReviews.filter(review => review.productId === productId && !review.isDeleted)
}

// Helper function to calculate review statistics
export function calculateReviewStats(productId: number) {
  const productReviews = getReviewsByProductId(productId)
  
  if (productReviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    }
  }

  const totalReviews = productReviews.length
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / totalReviews

  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  productReviews.forEach(review => {
    ratingDistribution[review.rating as keyof typeof ratingDistribution]++
  })

  return {
    totalReviews,
    averageRating,
    ratingDistribution
  }
}