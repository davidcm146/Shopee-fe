import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes/router'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { ReviewProvider } from './context/ReviewContext'
import { SellerProvider } from './context/SellerContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <OrderProvider>
        <ReviewProvider>
          <SellerProvider>
            <RouterProvider router={router} />
          </SellerProvider>
        </ReviewProvider>
      </OrderProvider>  
    </CartProvider>
  </StrictMode>,
)
