import { useEffect, useState } from 'react'

const MOBILE_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

function detectMobile(): boolean {
  if (typeof window === 'undefined') return false
  return (
    MOBILE_REGEX.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && window.innerWidth < 1024)
  )
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(detectMobile)

  useEffect(() => {
    const onResize = () => setIsMobile(detectMobile())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isMobile
}
