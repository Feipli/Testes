import { lazy, Suspense } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import type { HumanHead3DProps } from './types'

const HumanHeadCanvas = lazy(() =>
  import('./HumanHeadCanvas').then((module) => ({
    default: module.HumanHeadCanvas,
  })),
)

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

  if (isMobile) {
    return (
      <img
        src={fallbackImageUrl}
        alt={fallbackAlt}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          ...style,
        }}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    >
      <Suspense
        fallback={
          <img
            src={fallbackImageUrl}
            alt={fallbackAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            loading="lazy"
            decoding="async"
          />
        }
      >
        <HumanHeadCanvas
          glbUrl={glbUrl}
          floatAmplitude={floatAmplitude}
          floatSpeed={floatSpeed}
        />
      </Suspense>
    </div>
  )
}
