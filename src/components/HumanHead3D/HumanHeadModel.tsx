import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { Group } from 'three'

const DRACO_DECODER_PATH =
  'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'

useGLTF.setDecoderPath(DRACO_DECODER_PATH)

interface HumanHeadModelProps {
  url: string
  floatAmplitude: number
  floatSpeed: number
  onReady: () => void
}

function randomRotationSpeed(): number {
  return (Math.random() - 0.5) * 0.4
}

export function HumanHeadModel({
  url,
  floatAmplitude,
  floatSpeed,
  onReady,
}: HumanHeadModelProps) {
  const groupRef = useRef<Group>(null)
  const readyCalled = useRef(false)
  const { scene } = useGLTF(url, true)

  const clonedScene = useMemo(() => scene.clone(), [scene])

  const rotationSpeed = useMemo(
    () => ({
      x: randomRotationSpeed(),
      y: randomRotationSpeed(),
      z: randomRotationSpeed(),
    }),
    [],
  )

  useEffect(() => {
    if (readyCalled.current) return
    readyCalled.current = true
    onReady()
  }, [onReady])

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
      <primitive object={clonedScene} />
    </group>
  )
}

export function preloadHumanHeadModel(url: string): void {
  useGLTF.preload(url, true)
}
