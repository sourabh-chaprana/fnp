import { useMemo, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Loads a GLB, auto-centres + scales it.
 * materialColor — optional hex string; tints every mesh.
 *                 null/undefined restores the model's original baked colours.
 *
 * KEY: scene.clone(true) shares Material instances with the source scene.
 *      We must clone each material explicitly so colour changes don't pollute
 *      the useGLTF cache used by other components.
 */
export default function GLBModel({
  url,
  targetSize = 2,
  envMapIntensity = 1.2,
  materialColor,
  ...props
}) {
  const { scene }      = useGLTF(url)
  const primitiveRef   = useRef()
  const origColors     = useRef(new Map())

  const scaledScene = useMemo(() => {
    origColors.current.clear()

    const clone = scene.clone(true)

    clone.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow    = true
      child.receiveShadow = true

      // ── Clone materials so we own them (not sharing with cache) ──
      if (Array.isArray(child.material)) {
        child.material = child.material.map((m) => m.clone())
      } else {
        child.material = child.material.clone()
      }

      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((mat, idx) => {
        // Save original colour AFTER cloning
        origColors.current.set(`${child.uuid}-${idx}`, mat.color.clone())
        mat.envMapIntensity = envMapIntensity
        mat.needsUpdate     = true
      })
    })

    // Auto-centre and fit to targetSize
    const box    = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    const size   = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1

    clone.position.set(-center.x, -center.y, -center.z)

    const group = new THREE.Group()
    group.add(clone)
    group.scale.setScalar(targetSize / maxDim)
    return group
  }, [scene, targetSize, envMapIntensity])

  // Apply / restore colour whenever the swatch changes
  useEffect(() => {
    if (!primitiveRef.current) return
    primitiveRef.current.traverse((child) => {
      if (!child.isMesh) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((mat, idx) => {
        if (materialColor) {
          mat.color.set(materialColor)
        } else {
          const orig = origColors.current.get(`${child.uuid}-${idx}`)
          if (orig) mat.color.copy(orig)
        }
        mat.needsUpdate = true
      })
    })
  }, [materialColor, scaledScene])

  return <primitive ref={primitiveRef} object={scaledScene} {...props} />
}

export function preloadModels(urls) {
  urls.forEach((url) => useGLTF.preload(url))
}
