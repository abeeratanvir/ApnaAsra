import type { MouseEvent } from 'react'

export function tiltMove(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  el.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-6px) scale(1.02)`
}

export function tiltLeave(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = ''
}

export function spotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
