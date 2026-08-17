import logoImg from '@/imports/apnaasra-logo.png'

type Page = 'home' | 'individuals' | 'ngos' | 'companies' | 'impact'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const nav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{ background: 'var(--downriver-dark)', borderTop: '1px solid rgba(29,191,191,0.2)', paddingTop: 60, paddingBottom: 32, color: 'rgba(255,255,255,0.75)' }}>
      {/* Top gradient line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--java), transparent)', marginBottom: 56, marginLeft: 'auto', marginRight: 'auto', maxWidth: 1280, opacity: 0.5 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src={logoImg} alt="ApnaAsra" style={{ width: 38, height: 38, objectFit: 'contain' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 20, color: 'white' }}>
                Apna<span style={{ color: 'var(--java)' }}>Asra</span>
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: 20, maxWidth: 240 }}>
              Together We Help, Together We Grow. Verified support connecting communities.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                { label: 'Instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 20.5h11a4 4 0 004-4v-11a4 4 0 00-4-4h-11a4 4 0 00-4 4v11a4 4 0 004 4z' },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, color 0.2s', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(29,191,191,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--java)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links col */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--java)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Navigate</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {([['Home', 'home'], ['Individuals', 'individuals'], ['NGOs', 'ngos'], ['Companies', 'companies'], ['Impact', 'impact']] as [string, Page][]).map(([label, page]) => (
                <button
                  key={page}
                  onClick={() => nav(page)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontSize: 14, color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--java)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact col */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--java)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'team@apnaasra.org',
                'support@apnaasra.org',
                'Islamabad, Pakistan',
              ].map(text => (
                <span key={text} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{text}</span>
              ))}
            </div>
          </div>

          {/* Mission col */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--java)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Mission</h4>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
              Bridging individuals in need with verified NGOs and CSR-driven companies for measurable, lasting community impact.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>© 2025 ApnaAsra. All rights reserved.</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Together We Help, Together We Grow.</span>
        </div>
      </div>
    </footer>
  )
}
