import { useEffect } from 'react'
import { HumanHead3D, preloadHumanHeadModel } from './components/HumanHead3D'

const GLB_URL = '/models/head.glb'
const FALLBACK_URL = '/images/head-fallback.png'

export function App() {
  useEffect(() => {
    fetch(GLB_URL, { method: 'HEAD' })
      .then((response) => {
        if (response.ok) preloadHumanHeadModel(GLB_URL)
      })
      .catch(() => {})
  }, [])

  return (
    <main className="app">
      <HumanHead3D
        glbUrl={GLB_URL}
        fallbackImageUrl={FALLBACK_URL}
        fallbackAlt="Retrato"
        className="head-viewer"
      />
    </main>
  )
}
