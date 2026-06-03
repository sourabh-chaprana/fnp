import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function SceneLights({ intensity = 1, color = '#e8b84b' }) {
  const rimRef = useRef()

  useFrame(({ clock }) => {
    if (rimRef.current) {
      rimRef.current.intensity = intensity * (0.8 + Math.sin(clock.elapsedTime * 0.5) * 0.2)
    }
  })

  return (
    <>
      {/* Key light — warm gold */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={intensity * 1.5}
        color="#fff8e7"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light — cool blue rim */}
      <directionalLight position={[-5, 3, -5]} intensity={intensity * 0.4} color="#8ab4f8" />

      {/* Bottom bounce */}
      <directionalLight position={[0, -4, 2]} intensity={intensity * 0.2} color="#ffeed5" />

      {/* Animated rim glow */}
      <pointLight ref={rimRef} position={[0, 2, 4]} intensity={intensity * 0.8} color={color} distance={20} />

      {/* Ambient fill */}
      <ambientLight intensity={intensity * 0.3} color="#1a1a2e" />
    </>
  )
}
