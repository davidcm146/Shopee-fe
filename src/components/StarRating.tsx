import { faStar as fullStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface StarRatingProps {
  rating?: number
}

export function StarRating({ rating = 0 }: StarRatingProps) {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesomeIcon key={i} icon={fullStar} className="text-yellow-500 h-4 w-4" />)
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-500 h-4 w-4" />)
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={emptyStar} className="text-yellow-500 h-4 w-4" />)
    }
  }

  return <div className="flex gap-0.5">{stars}</div>
}
