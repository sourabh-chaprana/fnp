import { useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/ui/Navbar'
import { products, categories } from '../../data/products'
import useStore from '../../store/useStore'
import CardViewer3D from '../../components/product/CardViewer3D'

// ─── Single product card ──────────────────────────────────────────────────────
function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={() => onClick(product)}
      className="flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        scrollSnapAlign: 'start',
        boxShadow: '0 2px 16px rgba(233,30,140,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(233,30,140,0.18), 0 2px 8px rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(233,30,140,0.06), 0 1px 4px rgba(0,0,0,0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* 3D viewer area */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '260px',
          background: `radial-gradient(ellipse at 50% 40%, #ffffff 0%, ${product.color}12 70%, ${product.color}06 100%)`,
        }}
      >
        <CardViewer3D product={product} />

        {/* Free delivery tag */}
        {product.deliveryType === 'Free Delivery' && (
          <div className="absolute top-2 left-2 bg-white/90 text-pink-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-100 z-10">
            Free Delivery
          </div>
        )}

        {/* 3D badge */}
        <div
          className="absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10"
          style={{ background: product.color }}
        >
          ◈ 3D VIEW
        </div>

        {/* Tag */}
        {product.tags[0] && (
          <div className="absolute bottom-2 left-2 bg-pink-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10">
            {product.tags[0]}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-gray-900 font-semibold text-sm leading-snug mb-3 line-clamp-2 min-h-[40px]">
          {product.name}
        </p>

        {/* Price row */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="text-pink-500 font-bold text-xl">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-gray-300 text-sm line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="bg-green-50 text-green-600 border border-green-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-400 text-xs">{'★'.repeat(Math.round(product.rating))}</span>
          <span className="text-gray-400 text-xs">
            {product.rating} · {product.reviewCount.toLocaleString()} reviews
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Arrow button for carousel nav ───────────────────────────────────────────
function ArrowBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:border-pink-300 hover:text-pink-500 transition-colors duration-150 flex-shrink-0"
    >
      {dir === 'left' ? '‹' : '›'}
    </button>
  )
}

// ─── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate   = useNavigate()
  const scrollRef  = useRef()
  const { activeCategory, setActiveCategory } = useStore()

  const visible = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory)

  const handleClick = useCallback((p) => navigate(`/product/${p.id}`), [navigate])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <div
      className="w-full min-h-screen"
      style={{ background: 'linear-gradient(160deg,#fdfaf8 0%,#fef6f2 55%,#fdf4fb 100%)' }}
    >
      <Navbar />

      {/* ════════════ HERO TEXT ════════════ */}
      <div className="pt-24 pb-4 px-8 md:px-14">
        <p className="text-pink-500 text-[11px] font-bold tracking-[0.28em] uppercase mb-2">
          Birthday · Anniversary · All Occasions
        </p>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Birthday <span className="pink-text">Cakes</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {products.length} of 634 Gifts &nbsp;·&nbsp;
              <span className="text-pink-500 font-semibold">★ 4.8</span>
              &nbsp;60,938 Reviews
            </p>
          </div>
          {/* Sort placeholder */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-gray-500 text-xs shadow-sm cursor-pointer hover:border-pink-300 transition-colors">
            Sort by: <span className="font-semibold text-gray-700 ml-1">Recommended</span>
            <span className="ml-1">▾</span>
          </div>
        </div>
      </div>

      {/* ════════════ CATEGORY PILLS ════════════ */}
      <div className="px-8 md:px-14 pb-5 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={[
              'px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-colors duration-150 border',
              activeCategory === cat.id
                ? 'border-transparent text-white'
                : 'bg-white border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-500',
            ].join(' ')}
            style={activeCategory === cat.id
              ? { background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }
              : {}}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ════════════ PRODUCT CAROUSEL ════════════ */}
      <div className="px-8 md:px-14 pb-8">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-sm">{visible.length} products</p>
          <div className="flex gap-2">
            <ArrowBtn dir="left"  onClick={() => scroll('left')} />
            <ArrowBtn dir="right" onClick={() => scroll('right')} />
          </div>
        </div>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-3"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onClick={handleClick} />
          ))}
        </div>
      </div>

      {/* ════════════ FEATURE STRIP ════════════ */}
      <div className="bg-white border-y border-gray-100 py-5 px-8 md:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {[
            ['🌹','Fresh Flowers',     'Hand-picked daily'],
            ['🎂','Artisan Cakes',     'Custom & eggless'],
            ['🚚','Same Day Delivery', '3-hour express slots'],
            ['🎁','Personalised Gifts','Made just for them'],
            ['⭐','4.8 Rated',          '60,000+ reviews'],
          ].map(([icon, title, sub]) => (
            <div key={title} className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-gray-800 text-sm font-semibold">{title}</p>
                <p className="text-gray-400 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ CATEGORIES GRID ════════════ */}
      <div className="px-8 md:px-14 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-display">Popular Categories</h2>
          <a href="#" className="text-pink-500 text-sm font-semibold hover:underline">View all →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { label: 'Chocolate Cakes', emoji: '🍫', bg: '#fef3e2' },
            { label: 'Rose Bouquets',   emoji: '🌹', bg: '#fce4f3' },
            { label: 'Fruit Cakes',     emoji: '🍓', bg: '#fef9e7' },
            { label: 'Photo Cakes',     emoji: '📸', bg: '#e8f4ff' },
            { label: 'Eggless Cakes',   emoji: '🎂', bg: '#f0fdf4' },
          ].map(({ label, emoji, bg }) => (
            <div key={label}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              style={{ background: bg }}>
              <span className="text-4xl">{emoji}</span>
              <p className="text-sm font-semibold text-gray-700 text-center leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ OFFERS BANNER ════════════ */}
      <div className="px-8 md:px-14 pb-12">
        <div
          className="rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg,#fce4f3,#fef3e2)' }}
        >
          <div>
            <p className="text-pink-500 text-xs font-bold tracking-widest uppercase mb-1">Limited Time</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Get 20% off your first order</h3>
            <p className="text-gray-500 text-sm">Use code <span className="font-bold text-pink-500">FIRST20</span> at checkout</p>
          </div>
          <button
            className="flex-shrink-0 px-7 py-3 rounded-full text-sm font-bold text-white tracking-wider uppercase"
            style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}
          >
            Shop Now →
          </button>
        </div>
      </div>
    </div>
  )
}
