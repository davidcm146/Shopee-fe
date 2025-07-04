import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMobileAlt, faTshirt, faHome, faGift, faClock, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { getAllCategories } from "../data/category"
import { Link } from "react-router-dom"

const categoryIcons = {
  electronics: faMobileAlt,
  fashion: faTshirt,
  home: faHome,
  beauty: faGift,
  sports: faClock,
  all: faUtensils,
}

export function Categories() {
  const categories = getAllCategories().filter((category) => category.id !== "all")

  return (
    <section className="py-10 bg-white px-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => {
            const icon = categoryIcons[category.id as keyof typeof categoryIcons] || faUtensils
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="flex flex-col items-center p-4 border rounded-lg hover:border-orange-500 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon icon={icon} className="h-5 w-5 text-orange-500" />
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
