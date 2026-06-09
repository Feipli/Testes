import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { usePageVisibility } from '../../hooks/usePageVisibility'
import { RotatingPortrait } from './RotatingPortrait'

const TARGET_FPS = 30
const FRAME_MS = 1000 / TARGET_FPS

interface RotatingHeadSceneProps {
  imageUrl: string
}

function FpsLimiter({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    if (!active) return
    invalidate()
    const id = window.setInterval(() => invalidate(), FRAME_MS)
    return () => window.clearInterval(id)
  }, [active, invalidate])

  return null
}

function Scene({ imageUrl }: RotatingHeadSceneProps) {
  const isVisible = usePageVisibility()
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    if (isVisible) invalidate()
  }, [isVisible, invalidate])

  return (
    <>
      <FpsLimiter active={isVisible} />
      <Suspense fallback={null}>
        <RotatingPortrait imageUrl={imageUrl} />
      </Suspense>
    </>
  )
}

export function RotatingHeadScene({ imageUrl }: RotatingHeadSceneProps) {
  const isVisible = usePageVisibility()

  return (
    <Canvas
      frameloop={isVisible ? 'demand' : 'never'}
      camera={{ position: [0, 0, 4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene imageUrl={imageUrl} />
    </Canvas>
  )
}
