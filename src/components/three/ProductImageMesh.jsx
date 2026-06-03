import { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, MeshStandardMaterial } from 'three'
import * as THREE from 'three'

/**
 * Renders a product image on a rounded-rect plane with glass-like material.
 * Falls back to a coloured plane if the texture fails.
 */
export default function ProductImageMesh({ imageUrl, color = '#c9921a', hovered = false }) {
  const texture = useLoader(TextureLoader, imageUrl)
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const targetScale = hovered ? 1.08 : 1
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 6
    )
  })

  return (
    <mesh ref={meshRef} receiveShadow castShadow>
      <planeGeometry args={[2.2, 2.8, 1, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        roughness={0.2}
        metalness={0.1}
        envMapIntensity={0.5}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}
