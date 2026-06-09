import { useEffect, useState } from 'react'

type AssetStatus = 'loading' | 'available' | 'missing'

export function useAssetExists(url: string): AssetStatus {
  const [status, setStatus] = useState<AssetStatus>('loading')

  useEffect(() => {
    let cancelled = false

    setStatus('loading')

    fetch(url, { method: 'HEAD' })
      .then((response) => {
        if (!cancelled) {
          setStatus(response.ok ? 'available' : 'missing')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('missing')
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return status
}
