import { Image } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'

interface RotatingPortraitProps {
  imageUrl: string
  floatAmplitude?: number
  floatSpeed?: number
}

function randomSpeed(): number {
  return (Math.random() - 0.5) * 0.6
}

export function RotatingPortrait({
  imageUrl,
  floatAmplitude = 0.12,
  floatSpeed = 1.1,
}: RotatingPortraitProps) {
  const groupRef = useRef<Group>(null)

  const rotationSpeed = useMemo(
    () => ({ x: randomSpeed(), y: randomSpeed(), z: randomSpeed() }),
    [],
  )

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    group.rotation.x += rotationSpeed.x * delta
    group.rotation.y += rotationSpeed.y * delta
    group.rotation.z += rotationSpeed.z * delta
    group.position.y =
      Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude
  })

  return (
    <group ref={groupRef}>
      <Image
        url={imageUrl}
        scale={[2.4, 3.2]}
        transparent
        toneMapped={false}
      />
    </group>
  )
}
