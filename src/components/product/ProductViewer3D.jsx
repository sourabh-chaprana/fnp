import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
  useProgress,
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import GLBModel from '../three/GLBModel'

// ─── Loading ring ─────────────────────────────────────────────────────────────
function GLBLoader({ color }) {
  const { progress } = useProgress()
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 pointer-events-none rounded-2xl overflow-hidden"
      style={{
        background: 'transparent',
      }}
    >
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#f0dce8" strokeWidth="4" />
          <circle
            cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.35s ease' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold"
          style={{ color }}>
          {Math.round(progress)}%
        </span>
      </div>
      <p className="text-gray-400 text-[10px] tracking-widest uppercase">Loading 3D Model</p>
    </div>
  )
}

function SceneReady({ onReady }) {
  useEffect(() => { onReady() }, [onReady])
  return null
}

// ─── Lean 3D scene — transparent canvas, bg handled by CSS ───────────────────
function ModelScene({ product }) {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={1.6} color="#fff8f4" />
      <directionalLight
        position={[5, 10, 6]}
        intensity={2.8}
        color="#fffaf5"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={22}
      />
      <directionalLight position={[-4, 4, -5]} intensity={0.8} color="#c8e0ff" />

      {/* Soft product-colour rim from front-low */}
      <pointLight position={[0, -1, 5]} intensity={18} color={product.color} distance={14} />

      {/* Model — original colours, no tint */}
      <GLBModel url={product.model} targetSize={3.5} envMapIntensity={0.9} materialColor={null} />

      {/* Soft contact shadow */}
      <ContactShadows
        position={[0, -2.0, 0]}
        opacity={0.22}
        scale={9}
        blur={3}
        far={4}
        color="#b0a0a0"
      />

    </>
  )
}

// ─── Exported viewer ──────────────────────────────────────────────────────────
export default function ProductViewer3D({ product }) {
  const [resetKey, setResetKey] = useState(0)
  const [loading,  setLoading]  = useState(true)

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'transparent' }}
      onDoubleClick={() => setResetKey((k) => k + 1)}
    >
      {/* Loading overlay uses same gradient */}
      <AnimatePresence>
        {loading && (
          <motion.div className="absolute inset-0 z-20" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <GLBLoader color={product.color} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas is transparent — CSS bg shows through */}
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0)
          scene.background = null
        }}
        dpr={[1, 1.2]}
        shadows={false}
        frameloop="always"
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 6.5]} fov={43} />

        <Suspense fallback={null}>
          <ModelScene product={product} />
          <SceneReady onReady={() => setLoading(false)} />
        </Suspense>

        <OrbitControls
          key={resetKey}
          enableZoom
          enablePan={false}
          minDistance={3}
          maxDistance={11}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI * 0.75}
          autoRotate
          autoRotateSpeed={0.8}
          dampingFactor={0.06}
          enableDamping
          makeDefault
        />
      </Canvas>

    </div>
  )
}
