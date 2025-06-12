import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

interface SearchHeaderProps {
  query: string
  totalResults: number
  isLoading: boolean
}

export function SearchHeader({ query, totalResults, isLoading }: SearchHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-orange-500" />
        <h1 className="text-2xl font-bold">{query ? `Search Results for "${query}"` : "All Products"}</h1>
      </div>
      <p className="text-muted-foreground">{isLoading ? "Searching..." : `${totalResults} products found`}</p>
    </div>
  )
}
