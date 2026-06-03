import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Subtle mouse-parallax camera drift for the listing scene
export default function CameraController({ target = [0, 0, 0], strength = 0.3 }) {
  const { camera, gl } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const currentLook = useRef(new THREE.Vector3(...target))

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    const targetX = mouse.current.x * strength
    const targetY = -mouse.current.y * strength * 0.5

    camera.position.x += (targetX - camera.position.x) * delta * 2
    camera.position.y += (targetY + 0.5 - camera.position.y) * delta * 2

    const lerpTarget = new THREE.Vector3(
      target[0] + mouse.current.x * 0.1,
      target[1],
      target[2]
    )
    currentLook.current.lerp(lerpTarget, delta * 3)
    camera.lookAt(currentLook.current)
  })

  return null
}
