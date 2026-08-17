import { useEffect, useState } from 'react'
import logoImg from '@/imports/apnaasra-logo.png'

type Page = 'home' | 'individuals' | 'ngos' | 'companies' | 'impact'

interface NavbarProps {
  activePage: Page
  onNavigate: (page: Page) => void
}

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Individuals', page: 'individuals' },
  { label: 'NGOs', page: 'ngos' },
  { label: 'Companies', page: 'companies' },
  { label: 'Impact', page: 'impact' },
]

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 30)
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0)
    }
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (page: Page) => {
    onNavigate(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
        background: scrolled ? 'var(--navbar)' : 'var(--navbar-translucent)',
        backdropFilter: scrolled ? 'blur(0)' : 'blur(12px)',
        boxShadow: scrolled ? '0 2px 20px rgba(9,34,86,0.35)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 68 }}>
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none' }}
        >
          <img
            src={logoImg}
            alt="ApnaAsra logo"
            style={{ width: 42, height: 42, objectFit: 'contain', transition: 'filter 0.3s, transform 0.3s', filter: 'drop-shadow(0 0 0px var(--java))' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLImageElement).style.filter = 'drop-shadow(0 0 8px var(--java))'
              ;(e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLImageElement).style.filter = 'drop-shadow(0 0 0px var(--java))'
              ;(e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'
            }}
          />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, color: 'white', fontWeight: 800, letterSpacing: '-0.01em' }}>
            Apna<span style={{ color: 'var(--java)' }}>Asra</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              style={{
                border: 'none',
                cursor: 'pointer',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: activePage === page ? 'var(--java)' : 'rgba(255,255,255,0.8)',
                background: activePage === page ? 'rgba(29,191,191,0.12)' : 'none',
                transition: 'color 0.2s, background 0.2s, transform 0.2s',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (activePage !== page) (e.currentTarget as HTMLButtonElement).style.color = 'var(--java)'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(29,191,191,0.1)'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                if (activePage !== page) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)'
                ;(e.currentTarget as HTMLButtonElement).style.background = activePage === page ? 'rgba(29,191,191,0.12)' : 'none'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
              }}
            >
              {label}
              {activePage === page && (
                <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: 'var(--java)', borderRadius: 2, display: 'block' }} />
              )}
            </button>
          ))}
          <button className="btn-primary" style={{ marginLeft: 12, padding: '10px 22px', fontSize: 14 }} onClick={() => handleNav('individuals')}>
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: 8 }}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: 'var(--navbar)', padding: '8px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px 8px',
                fontSize: 15,
                fontWeight: 500,
                color: activePage === page ? 'var(--java)' : 'rgba(255,255,255,0.85)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {label}
            </button>
          ))}
          <button className="btn-primary" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }} onClick={() => handleNav('individuals')}>
            Get Started
          </button>
        </div>
      )}

      {/* Scroll progress */}
      <div className="scroll-progress-track">
        <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <style>{`
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </nav>
  )
}
