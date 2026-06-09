import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'

const RotatingHeadScene = lazy(() =>
  import('./components/RotatingHead').then((m) => ({
    default: m.RotatingHeadScene,
  })),
)

const DEFAULT_IMAGE = '/head.png'

export function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  useEffect(() => {
    fetch(DEFAULT_IMAGE, { method: 'HEAD' })
      .then((r) => {
        if (r.ok) setImageUrl(DEFAULT_IMAGE)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Escolha um arquivo de imagem (PNG ou JPG).')
      return
    }

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)

    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    setImageUrl(url)
    setError(null)
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Minha cabeça em 3D</h1>
        <p>Escolha sua foto e ela vai girar na tela.</p>
        <label className="upload-btn">
          Escolher minha foto
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            hidden
          />
        </label>
        {error && <p className="error">{error}</p>}
      </header>

      <div className="viewer">
        {imageUrl ? (
          <Suspense fallback={<p className="loading">Carregando...</p>}>
            <RotatingHeadScene imageUrl={imageUrl} />
          </Suspense>
        ) : (
          <div className="placeholder">
            <p>↑ Clique em &quot;Escolher minha foto&quot; para começar</p>
            <p className="hint">
              Ou coloque sua foto em <code>public/head.png</code>
            </p>
          </div>
        )}
      </div>

      <details className="guide">
        <summary>Quero um modelo 3D real da minha cabeça (GLB)</summary>
        <ol>
          <li>
            Acesse{' '}
            <a href="https://www.meshy.ai" target="_blank" rel="noreferrer">
              Meshy.ai
            </a>{' '}
            ou{' '}
            <a href="https://lumalabs.ai" target="_blank" rel="noreferrer">
              Luma AI
            </a>
          </li>
          <li>Faça upload da sua foto → gere o modelo 3D</li>
          <li>Baixe o arquivo <code>.glb</code></li>
          <li>Coloque em <code>public/models/head.glb</code></li>
        </ol>
        <p>
          Por enquanto, sua foto já gira em 3D sem precisar de modelo — é o
          jeito mais rápido de ver resultado.
        </p>
      </details>
    </main>
  )
}
