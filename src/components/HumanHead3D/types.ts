import type { CSSProperties } from 'react'

export interface HumanHead3DProps {
  /** Caminho para o arquivo GLB (comprimido com Draco). */
  glbUrl: string
  /** Imagem PNG exibida em dispositivos móveis. */
  fallbackImageUrl: string
  /** Texto alternativo da imagem de fallback. */
  fallbackAlt?: string
  className?: string
  style?: CSSProperties
  /** Amplitude do movimento de flutuação (unidades 3D). */
  floatAmplitude?: number
  /** Velocidade do movimento de flutuação. */
  floatSpeed?: number
}
