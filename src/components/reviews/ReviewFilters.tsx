import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faFilter } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import type { ReviewFilters } from "../../types/review"

interface ReviewFiltersProps {
  filters: ReviewFilters
  onFiltersChange: (filters: ReviewFilters) => void
  totalReviews: number
  ratingCounts: { [key: number]: number }
}

export function ReviewFilters({ filters, onFiltersChange, totalReviews, ratingCounts }: ReviewFiltersProps) {
  const handleRatingFilter = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating, // Toggle off if same rating
    })
  }

  const handleSortChange = (sortBy: ReviewFilters["sortBy"]) => {
    onFiltersChange({
      ...filters,
      sortBy,
    })
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Rating Filters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
          <span className="font-medium">Filter by Rating</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.rating === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => handleRatingFilter(0)}
            className={filters.rating === 0 ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            All ({totalReviews})
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => handleRatingFilter(rating)}
              className={`flex items-center gap-1 ${
                filters.rating === rating ? "bg-orange-500 hover:bg-orange-600" : ""
              }`}
            >
              <span>{rating}</span>
              <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
              <span>({ratingCounts[rating] || 0})</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-medium">Sort by</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.sortBy === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("newest")}
            className={filters.sortBy === "newest" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            Newest
          </Button>
          <Button
            variant={filters.sortBy === "oldest" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("oldest")}
            className={filters.sortBy === "oldest" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            Oldest
          </Button>
          <Button
            variant={filters.sortBy === "rating_high" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("rating_high")}
            className={filters.sortBy === "rating_high" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            Highest Rating
          </Button>
          <Button
            variant={filters.sortBy === "rating_low" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("rating_low")}
            className={filters.sortBy === "rating_low" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            Lowest Rating
          </Button>
        </div>
      </div>
    </div>
  )
}
