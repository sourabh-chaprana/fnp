import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../../components/ui/Navbar'
import ProductViewer3D from '../../components/product/ProductViewer3D'
import AnimatedButton from '../../components/ui/AnimatedButton'
import { getProductById } from '../../data/products'
import useStore from '../../store/useStore'


function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s}
          className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-pink-500' : 'text-gray-200'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ProductDetails() {
  const { id }        = useParams()
  const navigate      = useNavigate()
  const product       = getProductById(id)
  const { addToCart } = useStore()

  const [added, setAdded] = useState(false)
  const [qty,   setQty]   = useState(1)

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ background: '#fdfaf8' }}>
      <p className="text-gray-400">Product not found.</p>
      <button className="text-pink-500 underline text-sm" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="relative min-h-screen w-full" style={{ background: '#f9f6f4' }}>
      <Navbar />

      {/* No fixed blobs — bokeh is inside the viewer panel below */}

      {/* ── Back button — fixed top-right corner ── */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-[72px] right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 text-gray-500 hover:text-pink-500 hover:border-pink-300 shadow-sm transition-all duration-200 text-xs font-semibold group"
      >
        ← Back to Gifts
      </button>

      <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '64px' }}>

        {/* ══════════════════════════════════════
            LEFT — 3D Viewer (56%)
        ══════════════════════════════════════ */}
        <div className="lg:w-[56%] relative flex flex-col overflow-hidden" style={{ minHeight: '70vh' }}>

          {/* Real studio background image */}
          <img
            src={product.bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
          />

          {/* 3D canvas sits on top */}
          <div className="flex-1 relative" style={{ zIndex: 2 }}>
            <ProductViewer3D product={product} />
          </div>

        </div>

        {/* ══════════════════════════════════════
            RIGHT — Product Info (44%)
        ══════════════════════════════════════ */}
        <div className="lg:w-[44%] flex flex-col px-6 md:px-10 lg:pl-8 lg:pr-14 py-8 overflow-y-auto" style={{ maxHeight: '100vh' }}>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <span key={tag}
                className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                style={{ background: `${product.color}18`, color: product.color, border: `1px solid ${product.color}33` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-1">
            {product.name}
          </h1>
          <p className="text-gray-400 text-sm mb-5">{product.subtitle}</p>

          {/* Rating */}
          <div className="flex items-center flex-wrap gap-3 mb-5 pb-5 border-b border-gray-100">
            <StarRating rating={product.rating} />
            <span className="text-pink-500 text-sm font-bold">{product.rating}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 text-xs">{product.reviewCount.toLocaleString()} Reviews</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 text-xs">🔥 {product.orderedCount.toLocaleString()}+ orders</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-5 mb-5 border border-gray-100 shadow-sm">
            <div>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Price</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-pink-500">₹{product.price.toLocaleString()}</span>
                <span className="text-gray-300 text-lg line-through">₹{product.originalPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="ml-auto px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
              {product.discount}% OFF
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.description}</p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {[
              { label: 'Flavour',  value: product.flavour },
              { label: 'Weight',   value: product.weight },
              { label: 'Delivery', value: product.deliveryType },
              { label: 'Category', value: product.category },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                <p className="text-gray-800 text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>

          {/* Free delivery */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 border"
            style={{ background: '#fce4f355', borderColor: '#e91e8c22' }}>
            <span className="text-xl">🚚</span>
            <div>
              <p className="text-pink-500 text-xs font-bold uppercase tracking-wider">Free Delivery</p>
              <p className="text-gray-400 text-xs">Enter receiver's location for available slots</p>
            </div>
          </div>

          {/* Offers */}
          {product.offers.length > 0 && (
            <div className="mb-5 space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Offers Available</p>
              {product.offers.map((offer, i) => (
                <div key={i} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 border border-gray-100 shadow-sm">
                  <span className="text-xs font-bold text-gray-500 w-16 shrink-0">{offer.provider}</span>
                  <p className="text-gray-400 text-xs">{offer.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Qty selector */}
          <div className="flex items-center gap-4 mb-4">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Quantity</p>
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg text-gray-500 hover:bg-white hover:text-pink-500 transition-colors font-bold text-lg leading-none">−</button>
              <span className="w-8 text-center text-gray-800 font-semibold text-sm">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)}
                className="w-7 h-7 rounded-lg text-gray-500 hover:bg-white hover:text-pink-500 transition-colors font-bold text-lg leading-none">+</button>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mt-auto pt-2">
            <AnimatedButton variant="outline" icon="🛒" onClick={handleAddToCart} className="flex-1 justify-center py-3.5">
              {added ? '✓ Added!' : 'Add To Cart'}
            </AnimatedButton>
            <AnimatedButton variant="gold" icon="⚡"
              onClick={() => navigate('/checkout', { state: { product, qty } })}
              className="flex-1 justify-center py-3.5">
              Buy Now
            </AnimatedButton>
          </div>
        </div>

      </div>
    </div>
  )
}
