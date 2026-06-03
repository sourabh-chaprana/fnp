import { useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'
import Product3DCard from './Product3DCard'
import CameraController from '../three/CameraController'

const CARD_SPACING = 3.2
const VISIBLE_COUNT = 5

// ─── Soft petal-like floating particles for light scene ──────────────────────
import { useMemo } from 'react'
import * as THREE from 'three'

function SoftParticles() {
  const mesh = useRef()
  const [positions, vels] = useMemo(() => {
    const count = 100
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      vel[i * 3]     = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = Math.random() * 0.004 + 0.001
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }
    return [pos, vel]
  }, [])

  useFrame(() => {
    if (!mesh.current) return
    const arr = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < 100; i++) {
      arr[i * 3]     += vels[i * 3]
      arr[i * 3 + 1] += vels[i * 3 + 1]
      arr[i * 3 + 2] += vels[i * 3 + 2]
      if (arr[i * 3 + 1] > 5) {
        arr[i * 3 + 1] = -5
        arr[i * 3]     = (Math.random() - 0.5) * 24
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={100} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06} color="#e91e8c" transparent opacity={0.35}
        sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ProductCarousel3D({ products, onProductClick }) {
  const groupRef    = useRef()
  const isDragging  = useRef(false)
  const lastX       = useRef(0)
  const velocity    = useRef(0)
  const offset      = useRef(0)
  const targetOffset = useRef(0)

  const clamp = (v) => Math.max(
    -(VISIBLE_COUNT - 1) * CARD_SPACING * 0.5,
    Math.min((VISIBLE_COUNT - 1) * CARD_SPACING * 0.5, v)
  )

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (!isDragging.current) {
      velocity.current *= 0.91
      targetOffset.current = clamp(targetOffset.current + velocity.current)
    }
    offset.current += (targetOffset.current - offset.current) * delta * 5
    groupRef.current.position.x = offset.current
  })

  const handlePointerDown  = useCallback((e) => { isDragging.current = true; lastX.current = e.clientX; velocity.current = 0 }, [])
  const handlePointerMove  = useCallback((e) => {
    if (!isDragging.current) return
    const dx = (e.clientX - lastX.current) / 120
    velocity.current = dx
    targetOffset.current = clamp(targetOffset.current + dx)
    lastX.current = e.clientX
  }, [])
  const handlePointerUp    = useCallback(() => { isDragging.current = false }, [])
  const handleWheel        = useCallback((e) => {
    e.preventDefault()
    const d = -e.deltaY / 400
    velocity.current = d * 2
    targetOffset.current = clamp(targetOffset.current + d * CARD_SPACING * 0.5)
  }, [])

  return (
    <>
      <CameraController target={[0, 0, 0]} strength={0.3} />

      {/* HDRI for PBR materials */}
      <Environment preset="studio" background={false} />
      {/* Bright even light so coloured models read clearly */}
      <ambientLight intensity={2.8} color="#ffffff" />
      <directionalLight position={[0, 8, 6]}  intensity={1.2} color="#ffffff" />
      <directionalLight position={[0, 0, 10]} intensity={0.6} color="#fff8f0" />

      {/* Pink soft particles */}
      <SoftParticles />

      {/* Cards */}
      <group
        ref={groupRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
      >
        {products.map((product, i) => {
          const x    = (i - Math.floor(VISIBLE_COUNT / 2)) * CARD_SPACING
          const rotY = ((i - Math.floor(VISIBLE_COUNT / 2)) / VISIBLE_COUNT) * -0.2
          return (
            <group key={product.id} rotation={[0, rotY, 0]}>
              <Product3DCard
                product={product}
                position={[x, 0, 0]}
                onClick={onProductClick}
                index={i}
              />
            </group>
          )
        })}
      </group>

      {/* Soft ground shadow */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.18}
        scale={30}
        blur={3}
        far={6}
        color="#e91e8c"
      />
    </>
  )
}
