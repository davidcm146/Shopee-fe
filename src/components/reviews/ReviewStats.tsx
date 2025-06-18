import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent } from "../ui/card"
import type { ReviewStats } from "../../types/review"

interface ReviewStatsProps {
  stats: ReviewStats
}

export function ReviewStats({ stats }: ReviewStatsProps) {
  const { totalReviews, averageRating, ratingDistribution } = stats

  // Don't render if no reviews (handled by parent component)
  if (totalReviews === 0) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          {/* Average Rating Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-1">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`h-5 w-5 ${i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution]
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

              return (
                <div key={rating} className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{rating}</span>
                    <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
