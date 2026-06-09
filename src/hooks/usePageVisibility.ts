import { useEffect, useState } from 'react'

export function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  )

  useEffect(() => {
    const onVisibilityChange = () => setIsVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return isVisible
}
