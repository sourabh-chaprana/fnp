import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingParticles({ count = 120, spread = 20, color = '#e8b84b', size = 0.04 }) {
  const mesh = useRef()

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5
      vel[i * 3] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = Math.random() * 0.003 + 0.001
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }
    return [pos, vel]
  }, [count, spread])

  useFrame(() => {
    if (!mesh.current) return
    const arr = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3]
      arr[i * 3 + 1] += velocities[i * 3 + 1]
      arr[i * 3 + 2] += velocities[i * 3 + 2]

      // Reset when particle drifts too high
      if (arr[i * 3 + 1] > spread * 0.3) {
        arr[i * 3 + 1] = -spread * 0.3
        arr[i * 3] = (Math.random() - 0.5) * spread
        arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
