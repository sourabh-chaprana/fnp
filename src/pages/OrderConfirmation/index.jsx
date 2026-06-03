import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../../components/ui/Navbar'

const DELIVERY_LABELS = {
  today:    'Today',
  tomorrow: 'Tomorrow',
  dayafter: 'Day After Tomorrow',
}

function ConfettiDot({ x, y, color, delay, size }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      initial={{ y: 0, opacity: 1, scale: 1 }}
      animate={{ y: [0, -60, 120], opacity: [1, 1, 0], rotate: [0, 180, 360] }}
      transition={{ duration: 1.8, delay, ease: 'easeOut' }}
    />
  )
}

export default function OrderConfirmation() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { product, qty, total, address, deliverySlot, payMethod, orderId } = location.state || {}

  // Confetti dots
  const dots = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      x: `${Math.random() * 90 + 5}%`,
      y: `${Math.random() * 40}%`,
      color: ['#e91e8c','#c9921a','#7c5cbf','#16a34a','#e8b84b'][i % 5],
      delay: Math.random() * 0.6,
      size: Math.random() * 10 + 5,
    }))
  )

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ background: '#fdfaf8' }}>
        <p className="text-gray-400">No order found.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2.5 rounded-full text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}>Go Home</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#fdfaf8,#fef6f2)' }}>
      <Navbar />

      {/* Confetti */}
      {dots.current.map((d, i) => <ConfettiDot key={i} {...d} />)}

      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16 flex flex-col items-center">

        {/* Success icon */}
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl"
          style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
        >
          <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }} />
          </svg>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Order Placed! 🎉
        </motion.h1>
        <motion.p className="text-gray-400 text-sm mb-1 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          Thank you for your order.
        </motion.p>
        <motion.p className="text-pink-500 font-bold text-sm mb-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
          Order ID: {orderId}
        </motion.p>

        {/* Delivery timeline */}
        <motion.div
          className="w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl flex-shrink-0">🚚</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Expected Delivery</p>
              <p className="text-green-500 font-semibold text-base">{DELIVERY_LABELS[deliverySlot] || 'Tomorrow'}</p>
              <p className="text-gray-400 text-xs">10 AM – 8 PM time slot</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Delivery to</p>
              <p className="text-gray-700 font-semibold text-sm">{address?.name}</p>
              <p className="text-gray-400 text-xs">{address?.city} – {address?.pincode}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-2">
            {['Confirmed','Being Packed','Out for Delivery','Delivered'].map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${i === 0 ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <p className={`text-[10px] hidden md:block ml-1 ${i===0 ? 'text-pink-500 font-semibold' : 'text-gray-400'}`}>{step}</p>
                {i < 3 && <div className="flex-1 h-px mx-2 bg-gray-200" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product card */}
        <motion.div
          className="w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
        >
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Order Details</p>
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100"
              style={{ background: product.color + '15' }}>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm leading-snug">{product.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">{product.subtitle}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-pink-500 font-bold">₹{total.toLocaleString()}</span>
                <span className="text-gray-400 text-xs">Qty: {qty}</span>
                <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-100">
                  {product.discount}% OFF applied
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment info */}
        <motion.div
          className="w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Payment</p>
              <p className="text-gray-700 font-semibold text-sm capitalize">
                {payMethod === 'card' ? '💳 Credit / Debit Card'
                  : payMethod === 'upi' ? '📱 UPI'
                  : payMethod === 'netbanking' ? '🏦 Net Banking'
                  : '💵 Cash on Delivery'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Amount Paid</p>
              <p className="text-pink-500 font-bold text-xl">₹{total.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div className="flex gap-4 w-full"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3.5 rounded-2xl border-2 border-pink-200 text-pink-500 font-bold text-sm tracking-wider hover:bg-pink-50 transition-colors">
            Continue Shopping
          </button>
          <button
            className="flex-1 py-3.5 rounded-2xl text-white font-bold text-sm tracking-wider shadow-md"
            style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}>
            Track Order
          </button>
        </motion.div>

      </div>
    </div>
  )
}
