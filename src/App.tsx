import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Categories } from "./components/Categories"
import { FlashSale } from "./components/PopularProducts"
import { PopularProducts } from "./components/AllProducts"
import { Footer } from "./components/Footer"
import { ThemeProvider } from "./components/ThemeProvider"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"

// Add FontAwesome icons to the library
library.add(fas, fab)

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="shopee-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Categories />
          <FlashSale />
          <PopularProducts />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
