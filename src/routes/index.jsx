import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLoader from '../components/ui/PageLoader'

const Home              = lazy(() => import('../pages/Home'))
const ProductDetails    = lazy(() => import('../pages/ProductDetails'))
const Checkout          = lazy(() => import('../pages/Checkout'))
const OrderConfirmation = lazy(() => import('../pages/OrderConfirmation'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/product/:id"         element={<ProductDetails />} />
        <Route path="/checkout"            element={<Checkout />} />
        <Route path="/order-confirmation"  element={<OrderConfirmation />} />
      </Routes>
    </Suspense>
  )
}
