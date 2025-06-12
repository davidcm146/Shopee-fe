import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

export function Hero() {
  return (
    <section className="py-6 md:py-10 bg-orange-50">
      <div className="container">
        <Carousel className="w-full">
          <CarouselContent>
            {[1, 2, 3].map((_, index) => (
              <CarouselItem key={index}>
                <div className="relative overflow-hidden rounded-lg px-8">
                  <img
                    src={`/placeholder.svg?height=400&width=1200&text=Shopee+Promo+${index + 1}`}
                    alt={`Promotion banner ${index + 1}`}
                    className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
                      {index === 0 ? "Big Sale Day" : index === 1 ? "New Arrivals" : "Flash Deals"}
                    </h2>
                    <p className="text-sm md:text-base text-white mb-4 max-w-md">
                      {index === 0
                        ? "Up to 90% off on thousands of items. Limited time only!"
                        : index === 1
                          ? "Check out the latest products from top brands"
                          : "Lightning deals every hour. Don't miss out!"}
                    </p>
                    <Link to={"/products"}>
                      <Button className="w-fit bg-orange-500 hover:bg-orange-600">Shop Now</Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 px-8">
          {["Free Shipping", "Authentic Products", "Easy Returns", "Secure Payment"].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-orange-500 font-bold">{index + 1}</span>
              </div>
              <h3 className="text-sm font-medium">{feature}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
