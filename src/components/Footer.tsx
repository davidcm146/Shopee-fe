import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 px-8">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Shopee</h3>
            <p className="text-sm mb-4">The leading online shopping platform in Southeast Asia and Taiwan.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faFacebookF} className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  How to Buy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Return & Refund
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Shopee</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Shopee Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Shopee Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Shopee Policies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
            <p className="text-sm mb-4">Get the latest news and promotions</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-orange-500 hover:bg-orange-600">Subscribe</Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-orange-500" />
                <span>support@shopee.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-orange-500" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 text-orange-500" />
                <span>123 Shopping Street, E-commerce City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center text-gray-400">
          <p>© 2023 Shopee. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
