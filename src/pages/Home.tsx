import { Hero } from "../components/Hero"
import { Categories } from "../components/Categories"
import { PopularProducts } from "../components/PopularProducts"
import { AllProducts } from "../components/AllProducts"

export function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <PopularProducts />
      <AllProducts />
    </>
  )
}
