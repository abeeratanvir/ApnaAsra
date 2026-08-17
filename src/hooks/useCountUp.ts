import { useEffect, useRef, useState } from 'react'

export function useCountUp(value: string, active: boolean, duration = 1400) {
  const match = value.match(/[\d,]+\.?\d*/)
  const target = match ? parseFloat(match[0].replace(/,/g, '')) : null
  const hasCommas = match ? match[0].includes(',') : false
  const decimals = match && match[0].includes('.') ? match[0].split('.')[1].length : 0
  const prefix = match ? value.slice(0, match.index) : ''
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : ''

  const [display, setDisplay] = useState(target === null ? '' : (decimals > 0 ? (0).toFixed(decimals) : '0'))
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current || target === null) return
    started.current = true

    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased
      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString()
      setDisplay(hasCommas ? Number(formatted).toLocaleString('en-IN') : formatted)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration, decimals, hasCommas])

  if (target === null) return value
  return `${prefix}${display}${suffix}`
}
