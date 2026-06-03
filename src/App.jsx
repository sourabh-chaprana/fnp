import { BrowserRouter, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppRoutes from './routes'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <AppRoutes key={location.pathname} />
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
