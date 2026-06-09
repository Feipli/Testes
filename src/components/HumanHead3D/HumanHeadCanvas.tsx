import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { usePageVisibility } from '../../hooks/usePageVisibility'
import { HumanHeadModel } from './HumanHeadModel'
import type { HumanHead3DProps } from './types'

const TARGET_FPS = 30
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS

type CanvasContentProps = Pick<
  HumanHead3DProps,
  'glbUrl' | 'floatAmplitude' | 'floatSpeed'
>

function FpsLimiter({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (!active) return

    const id = window.setInterval(() => invalidate(), FRAME_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [active, invalidate])

  return null
}

function CanvasContent({
  glbUrl,
  floatAmplitude = 0.08,
  floatSpeed = 1.2,
}: CanvasContentProps) {
  const isVisible = usePageVisibility()

  return (
    <>
      <FpsLimiter active={isVisible} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#ff4466" />
      <Suspense fallback={null}>
        <HumanHeadModel
          url={glbUrl}
          floatAmplitude={floatAmplitude}
          floatSpeed={floatSpeed}
        />
      </Suspense>
    </>
  )
}

export function HumanHeadCanvas(props: CanvasContentProps) {
  const isVisible = usePageVisibility()
  const frameloop = isVisible ? 'demand' : 'never'

  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0, 2.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <CanvasContent {...props} />
    </Canvas>
  )
}
