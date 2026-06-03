import { motion } from 'framer-motion'

export default function AnimatedButton({
  children,
  variant = 'gold',
  onClick,
  className = '',
  icon,
  disabled = false,
}) {
  const base =
    'relative px-6 py-3 rounded-full font-semibold text-xs tracking-widest uppercase overflow-hidden flex items-center gap-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    gold: 'btn-gold text-white',
    outline: 'btn-outline text-white',
    ghost: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
  }

  return (
    <motion.button
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {/* Shimmer sweep on hover */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        whileHover={{ translateX: '200%' }}
        transition={{ duration: 0.6 }}
      />
      {icon && <span className="text-base leading-none">{icon}</span>}
      {children}
    </motion.button>
  )
}
