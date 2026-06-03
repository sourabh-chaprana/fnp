import { Component, useMemo, useRef, useState, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import GLBModel from '../three/GLBModel'

// ─── Gradient canvas texture ──────────────────────────────────────────────────
function useGradientTexture(hex) {
  return useMemo(() => {
    const s = 512, cv = document.createElement('canvas')
    cv.width = cv.height = s
    const ctx = cv.getContext('2d')
    ctx.fillStyle = '#f8f4ff'
    ctx.fillRect(0, 0, s, s)
    const g = ctx.createRadialGradient(s*.5, s*.45, 0, s*.5, s*.45, s*.6)
    g.addColorStop(0,   hex + 'ee')
    g.addColorStop(0.5, hex + '66')
    g.addColorStop(1,   '#00000000')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, s, s)
    return new THREE.CanvasTexture(cv)
  }, [hex])
}

// ─── Soft coloured oval behind the model ─────────────────────────────────────
function ColorBlob({ color }) {
  const tex = useGradientTexture(color)
  return (
    <mesh position={[0, 0.44, 0.04]}>
      <planeGeometry args={[2.35, 2.55]} />
      <meshStandardMaterial map={tex} transparent roughness={1} metalness={0} depthWrite={false} />
    </mesh>
  )
}

// ─── Error boundary ───────────────────────────────────────────────────────────
class GLBBoundary extends Component {
  constructor(p) { super(p); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() {}
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// ─── Slowly rotating coloured GLB ────────────────────────────────────────────
function RotatingGLB({ url, modelColor }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.7
  })
  return (
    <group ref={ref} position={[0, 0.44, 0.18]} rotation={[-0.07, 0, 0]}>
      <GLBModel url={url} targetSize={1.7} envMapIntensity={0.9} materialColor={modelColor} />
    </group>
  )
}

// bgColor = soft blob behind model (uses product.color)
// modelColor = null → GLB uses its original colours
function CardGLBPreview({ url, bgColor }) {
  return (
    <>
      <ColorBlob color={bgColor || '#e85a8c'} />
      <GLBBoundary>
        <Suspense fallback={null}>
          <RotatingGLB url={url} modelColor={null} />
        </Suspense>
      </GLBBoundary>
    </>
  )
}

// ─── Main card ────────────────────────────────────────────────────────────────
export default function Product3DCard({ product, position, onClick }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((_, dt) => {
    if (!groupRef.current) return
    const targetZ = hovered ? position[2] + 0.4 : position[2]
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * Math.min(dt * 8, 1)
  })

  // Lighten the product colour for the card top background
  const bgColor = product.color + '18' // very light tint

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={() => onClick(product)}
      onPointerEnter={() => { setHovered(true);  document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
    >
      {/* ── Shadow plane ── */}
      <mesh position={[0, -2.05, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.6, 0.5]} />
        <meshBasicMaterial color="#000000" transparent opacity={hovered ? 0.10 : 0.05} />
      </mesh>

      {/* ── Card body ── */}
      <RoundedBox args={[2.6, 3.85, 0.10]} radius={0.13} smoothness={4}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.98} roughness={1} metalness={0} />
      </RoundedBox>

      {/* ── Coloured top section ── */}
      <mesh position={[0, 0.55, 0.052]}>
        <planeGeometry args={[2.56, 2.62]} />
        <meshBasicMaterial color={product.color} transparent opacity={0.07} />
      </mesh>

      {/* ── Hover border ── */}
      {hovered && (
        <RoundedBox args={[2.62, 3.87, 0.08]} radius={0.13} smoothness={4}>
          <meshStandardMaterial color={product.color} transparent opacity={0}
            roughness={1} metalness={0} side={THREE.BackSide} />
        </RoundedBox>
      )}

      {/* ── 3D model + colour blob ── */}
      {/* bgColor = soft glow behind model; model itself stays original */}
      <CardGLBPreview url={product.model} bgColor={product.color} />

      {/* ── Divider ── */}
      <mesh position={[0, -0.78, 0.06]}>
        <planeGeometry args={[2.34, 0.007]} />
        <meshBasicMaterial color={product.color} transparent opacity={0.35} />
      </mesh>

      {/* ── Tag chip (top-left) ── */}
      {product.tags[0] && (
        <group position={[-0.67, 1.75, 0.08]}>
          <RoundedBox args={[0.86, 0.23, 0.03]} radius={0.06}>
            <meshBasicMaterial color="#e91e8c" />
          </RoundedBox>
          <Text position={[0, 0, 0.03]} fontSize={0.087} color="#fff" anchorX="center" anchorY="middle">
            {product.tags[0]}
          </Text>
        </group>
      )}

      {/* ── 3D VIEW chip (top-right) ── */}
      <group position={[0.68, 1.75, 0.08]}>
        <RoundedBox args={[0.82, 0.23, 0.03]} radius={0.06}>
          <meshBasicMaterial color={product.color} />
        </RoundedBox>
        <Text position={[0, 0, 0.03]} fontSize={0.083} color="#fff" anchorX="center" anchorY="middle">
          {'◈ 3D VIEW'}
        </Text>
      </group>

      {/* ── Product name ── */}
      <Text position={[0, -0.96, 0.07]} fontSize={0.148} maxWidth={2.3}
        textAlign="center" color="#1a1a1a" anchorX="center" anchorY="top">
        {product.name}
      </Text>

      {/* ── Price row ── */}
      <Text position={[-0.48, -1.54, 0.07]} fontSize={0.23}
        color="#e91e8c" anchorX="left" anchorY="middle">
        {`₹${product.price.toLocaleString()}`}
      </Text>
      <Text position={[0.26, -1.54, 0.07]} fontSize={0.13}
        color="#bbbbbb" anchorX="left" anchorY="middle">
        {`₹${product.originalPrice.toLocaleString()}`}
      </Text>

      {/* ── Discount badge ── */}
      {product.discount > 0 && (
        <group position={[0.80, -1.54, 0.08]}>
          <RoundedBox args={[0.60, 0.24, 0.03]} radius={0.05}>
            <meshBasicMaterial color="#16a34a" />
          </RoundedBox>
          <Text position={[0, 0, 0.03]} fontSize={0.095} color="#fff" anchorX="center" anchorY="middle">
            {`${product.discount}% OFF`}
          </Text>
        </group>
      )}

      {/* ── Rating ── */}
      <Text position={[0, -1.79, 0.07]} fontSize={0.112}
        color="#888888" anchorX="center" anchorY="middle">
        {`★ ${product.rating}  ·  ${product.reviewCount.toLocaleString()} reviews`}
      </Text>
    </group>
  )
}
