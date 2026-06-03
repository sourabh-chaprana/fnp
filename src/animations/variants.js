// Reusable Framer Motion variant presets

export const fadeUp = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease: [0.22, 1, 0.36, 1] },
  },
})

export const fadeIn = (delay = 0, duration = 0.5) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay, duration } },
})

export const slideInLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
})

export const slideInRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
})

export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
})

export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})
