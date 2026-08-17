import type { CSSProperties } from 'react'

const COLORS = ['var(--java)', 'var(--downriver)', 'var(--java-light)', '#ffffff', 'var(--java-dark)']
const PIECE_COUNT = 10

export default function ConfettiBurst() {
  return (
    <div className="confetti-burst">
      {Array.from({ length: PIECE_COUNT }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / PIECE_COUNT
        const distance = 80 + (i % 3) * 22
        const bx = Math.cos(angle) * distance
        const by = Math.sin(angle) * distance
        const isSquare = i % 2 === 0
        const style = {
          '--bx': `${bx}px`,
          '--by': `${by}px`,
          '--br': `${(i % 2 === 0 ? 1 : -1) * 180}deg`,
          animationDelay: `${i * 30}ms`,
          background: COLORS[i % COLORS.length],
          borderRadius: isSquare ? 2 : '50%',
        } as CSSProperties

        return <span key={i} className="confetti-piece" style={style} />
      })}
    </div>
  )
}
