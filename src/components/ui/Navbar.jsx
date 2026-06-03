import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useStore from '../../store/useStore'

export default function Navbar() {
  const { cartItems } = useStore()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(233,30,140,0.1)',
        boxShadow: '0 1px 12px rgba(233,30,140,0.06)',
      }}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
          style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}>
          fnp
        </div>
        <div className="hidden sm:block">
          <p className="text-fnp-dark font-bold text-sm leading-tight">Ferns N Petals</p>
          <p className="text-fnp-muted text-[10px] tracking-widest uppercase">Premium Gifting</p>
        </div>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-7">
        {['Birthday', 'Cakes', 'Flowers', 'Personalised', 'LUXE'].map((item) => (
          <a key={item} href="#"
            className="text-fnp-muted hover:text-fnp-pink text-xs tracking-widest uppercase font-medium transition-colors duration-200">
            {item}
          </a>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="text-fnp-muted hover:text-fnp-pink transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>

        {/* Cart */}
        <button className="relative text-fnp-muted hover:text-fnp-pink transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-fnp-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>

        {/* Guest */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-fnp-pink border border-fnp-border hover:bg-fnp-pink hover:text-white transition-all duration-200">
          Hi, Guest
        </button>
      </div>
    </motion.header>
  )
}
