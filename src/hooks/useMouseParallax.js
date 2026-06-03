import { useEffect, useRef, useState } from 'react'

/**
 * Returns normalised mouse position (-1 to 1) with optional smoothing.
 */
export function useMouseParallax(smoothing = 0.08) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * smoothing
      current.current.y += (target.current.y - current.current.y) * smoothing
      setMouse({ x: current.current.x, y: current.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [smoothing])

  return mouse
}
