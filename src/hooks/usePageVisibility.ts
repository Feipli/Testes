import { useEffect, useState } from 'react'

export function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  )

  useEffect(() => {
    const onChange = () => setIsVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return isVisible
}
