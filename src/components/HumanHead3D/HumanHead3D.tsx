import { lazy, Suspense, useCallback, useState } from 'react'
import { useAssetExists } from '../../hooks/useAssetExists'
import { useIsMobile } from '../../hooks/useIsMobile'
import type { HumanHead3DProps } from './types'

const HumanHeadCanvas = lazy(() =>
  import('./HumanHeadCanvas').then((module) => ({
    default: module.HumanHeadCanvas,
  })),
)

const fallbackImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  display: 'block',
}

export function HumanHead3D({
  glbUrl,
  fallbackImageUrl,
  fallbackAlt = 'Retrato ilustrado',
  className,
  style,
  floatAmplitude,
  floatSpeed,
}: HumanHead3DProps) {
  const isMobile = useIsMobile()
  const glbStatus = useAssetExists(glbUrl)
  const [modelReady, setModelReady] = useState(false)
  const [modelFailed, setModelFailed] = useState(false)

  const handleModelReady = useCallback(() => setModelReady(true), [])
  const handleModelError = useCallback(() => setModelFailed(true), [])

  const canRender3D =
    !isMobile && glbStatus === 'available' && !modelFailed

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
    >
      <img
        src={fallbackImageUrl}
        alt={fallbackAlt}
        style={{
          ...fallbackImageStyle,
          opacity: canRender3D && modelReady ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
        loading="lazy"
        decoding="async"
      />

      {canRender3D && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: modelReady ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: modelReady ? 'auto' : 'none',
          }}
        >
          <Suspense fallback={null}>
            <HumanHeadCanvas
              glbUrl={glbUrl}
              floatAmplitude={floatAmplitude}
              floatSpeed={floatSpeed}
              onModelReady={handleModelReady}
              onModelError={handleModelError}
            />
          </Suspense>
        </div>
      )}
    </div>
  )
}
