import { useEffect } from 'react'
import { HumanHead3D, preloadHumanHeadModel } from './components/HumanHead3D'

const GLB_URL = '/models/head.glb'
const FALLBACK_URL = '/images/head-fallback.png'

export function App() {
  useEffect(() => {
    preloadHumanHeadModel(GLB_URL)
  }, [])

  return (
    <main className="app">
      <HumanHead3D
        glbUrl={GLB_URL}
        fallbackImageUrl={FALLBACK_URL}
        fallbackAlt="Retrato ilustrado em tons de vermelho"
        className="head-viewer"
      />
    </main>
  )
}
