import type { CSSProperties } from 'react'

interface IconProps {
  size?: number
  style?: CSSProperties
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export function CheckIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function UsersIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function BuildingIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="9" y1="7" x2="9" y2="7.01" />
      <line x1="15" y1="7" x2="15" y2="7.01" />
      <line x1="9" y1="12" x2="9" y2="12.01" />
      <line x1="15" y1="12" x2="15" y2="12.01" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  )
}

export function BriefcaseIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

export function HandshakeIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <path d="M8 12l3 3 5-5" />
      <path d="M3 11l4-4 4 3-3 3z" />
      <path d="M21 11l-4-4-4 3 3 3z" />
    </svg>
  )
}

export function LockIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

export function ClockIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  )
}

export function BellIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10.3 20a1.9 1.9 0 0 0 3.4 0" />
    </svg>
  )
}

export function DocumentIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </svg>
  )
}

export function ClipboardIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <rect x="6" y="4" width="12" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  )
}

export function CurrencyIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <line x1="6" y1="4" x2="16" y2="4" />
      <line x1="6" y1="8" x2="14" y2="8" />
      <line x1="6" y1="8" x2="6" y2="20" />
      <path d="M6 12h8a4 4 0 0 1 0 8H10" />
    </svg>
  )
}

export function TargetIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  )
}

export function BoltIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" />
    </svg>
  )
}

export function InfoIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <line x1="12" y1="8" x2="12" y2="8.01" />
    </svg>
  )
}

export function ChartIcon({ size = 24, style }: IconProps) {
  return (
    <svg {...base(size)} style={style}>
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="12" width="3" height="8" />
      <rect x="10.5" y="7" width="3" height="13" />
      <rect x="15" y="3" width="3" height="17" />
    </svg>
  )
}
