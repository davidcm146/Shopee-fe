import { Hero } from "../components/Hero"
import { Categories } from "../components/Categories"
import { FlashSale } from "../components/FlashSale"
import { PopularProducts } from "../components/PopularProducts"

export function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FlashSale />
      <PopularProducts />
    </>
  )
}
