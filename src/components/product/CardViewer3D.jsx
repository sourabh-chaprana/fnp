import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import GLBModel from '../three/GLBModel'

function SceneReady({ onReady }) {
  useEffect(() => { onReady() }, [onReady])
  return null
}

// Oscillates 0 → 180° → 0 using a sine wave (eases naturally at extremes)
function OscillatingGroup({ children, speed = 1.3 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.PI * 1.5 + Math.sin(clock.elapsedTime * speed) * (Math.PI / 18)
  })
  return <group ref={ref}>{children}</group>
}

function MiniScene({ modelUrl, color }) {
  return (
    <>
      <ambientLight intensity={1.8} color="#fff8f4" />
      <directionalLight position={[4, 8, 5]} intensity={2.5} color="#fffaf5" />
      <directionalLight position={[-3, 3, -4]} intensity={0.6} color="#c8e0ff" />
      <pointLight position={[0, -1, 4]} intensity={12} color={color} distance={10} />
      <OscillatingGroup speed={1.3}>
        <GLBModel url={modelUrl} targetSize={2.8} envMapIntensity={0.7} materialColor={null} />
      </OscillatingGroup>
    </>
  )
}

export default function CardViewer3D({ product }) {
  const [ready, setReady] = useState(false)

  return (
    <div className="w-full h-full relative">
      {/* Spinner overlay until model loads */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${product.color}18 0%, ${product.color}06 70%, transparent 100%)`,
            }}
          >
            {/* Spinning ring */}
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90 animate-spin" viewBox="0 0 40 40"
                style={{ animationDuration: '0.9s' }}>
                <circle cx="20" cy="20" r="16" fill="none"
                  stroke={`${product.color}22`} strokeWidth="3" />
                <circle cx="20" cy="20" r="16" fill="none"
                  stroke={product.color} strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="60 40" />
              </svg>
            </div>
            <p className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: product.color, opacity: 0.7 }}>
              Loading 3D
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas — pointer-events: none so card click still navigates */}
      <div className="w-full h-full" style={{ pointerEvents: 'none' }}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
          }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0)
            scene.background = null
          }}
          dpr={[1, 1.5]}
          shadows={false}
          frameloop="always"
        >
          <PerspectiveCamera makeDefault position={[0, 0.3, 5.5]} fov={40} />

          <Suspense fallback={null}>
            <MiniScene modelUrl={product.compressedModel} color={product.color} />
            <SceneReady onReady={() => setReady(true)} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
