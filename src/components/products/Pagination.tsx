import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, hasNextPage, hasPreviousPage, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={!hasPreviousPage}>
        <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
      </Button>

      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={page === currentPage ? "bg-orange-500 hover:bg-orange-600" : ""}
        >
          {page}
        </Button>
      ))}

      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage + 1)} disabled={!hasNextPage}>
        <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
      </Button>
    </div>
  )
}
