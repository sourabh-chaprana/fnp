import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5"
      style={{ background: 'radial-gradient(ellipse at center, #14102a 0%, #0a0a0f 100%)' }}>
      <motion.div
        className="w-14 h-14 rounded-full border-2 border-transparent"
        style={{ borderTopColor: '#e8b84b', borderRightColor: 'rgba(232,184,75,0.2)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-yellow-400"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Loading</p>
    </div>
  )
}
