import { useEffect, useRef, useState, type ReactNode } from 'react'
import logoImg from '@/imports/apnaasra-logo.png'
import { useCountUp } from '@/hooks/useCountUp'
import { tiltMove, tiltLeave, spotlightMove } from '@/lib/tilt'
import { CheckIcon, UsersIcon, BuildingIcon, BriefcaseIcon, HandshakeIcon, DocumentIcon, ChartIcon } from '@/components/icons'

type Page = 'home' | 'individuals' | 'ngos' | 'companies' | 'impact'

interface HomeProps {
  onNavigate: (page: Page) => void
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function MetricCard({ value, label, icon, delay }: { value: string; label: string; icon: ReactNode; delay: number }) {
  const { ref, visible } = useInView()
  const animatedValue = useCountUp(value, visible)
  return (
    <div
      ref={ref}
      className="hover-card tilt-card"
      onMouseMove={tiltMove}
      onMouseLeave={tiltLeave}
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '28px 24px',
        textAlign: 'center',
        boxShadow: '0 2px 16px rgba(9,34,86,0.08)',
        border: '1px solid var(--border-col)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div style={{ color: 'var(--java-dark)', marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div className="font-display" style={{ fontSize: 36, color: 'var(--downriver)', lineHeight: 1 }}>{animatedValue}</div>
      <div style={{ marginTop: 6, fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function Home({ onNavigate }: HomeProps) {
  const featuresRef = useRef<HTMLDivElement>(null)
  const [featVisible, setFeatVisible] = useState(false)
  const [audsVisible, setAudsVisible] = useState(false)
  const audsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFeatVisible(true) }, { threshold: 0.1 })
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAudsVisible(true) }, { threshold: 0.1 })
    if (featuresRef.current) obs1.observe(featuresRef.current)
    if (audsRef.current) obs2.observe(audsRef.current)
    return () => { obs1.disconnect(); obs2.disconnect() }
  }, [])

  const nav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const steps = [
    { icon: <DocumentIcon size={26} />, title: 'Submit a request', desc: 'Individuals and families describe their need in a simple, private form.', accent: '#e8f4ff' },
    { icon: <CheckIcon size={26} />, title: 'Verified by NGOs', desc: 'Local NGOs and orphanages review and verify each case with care.', accent: '#e8fff8' },
    { icon: <HandshakeIcon size={26} />, title: 'Supported by companies', desc: 'CSR teams support verified cases and track measurable impact.', accent: '#f0ebff' },
  ]

  const audiences = [
    {
      icon: <UsersIcon size={30} />,
      title: 'Individuals & Families',
      sub: 'Free, trusted local support',
      bullets: ['Verified case submission', 'Simple request form', 'Real-time status updates', 'Privacy-first approach'],
      page: 'individuals' as Page,
      accent: '#e8f4ff',
      accentDark: '#1e3a8a',
    },
    {
      icon: <BuildingIcon size={30} />,
      title: 'NGOs & Orphanages',
      sub: 'Verification and impact tools',
      bullets: ['Full case history & records', 'Verification badge system', 'Smart matching engine', 'Impact reporting dashboard'],
      page: 'ngos' as Page,
      accent: '#e8fff8',
      accentDark: '#065f46',
    },
    {
      icon: <BriefcaseIcon size={30} />,
      title: 'Companies',
      sub: 'CSR dashboard with measurable impact',
      bullets: ['Verified local projects', 'Recurring impact reports', 'Real data over generic sponsorship', 'Tax-compliant CSR tracking'],
      page: 'companies' as Page,
      accent: '#f0ebff',
      accentDark: '#5b21b6',
    },
  ]

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="hero-gradient"
        onMouseMove={spotlightMove}
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 80 }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div className="section-label animate-fade-up" style={{ animationDelay: '0.1s', color: 'rgb(255, 255, 255)' }}>
              Together We Help, Together We Grow
            </div>
            <h1
              className="animate-fade-up"
              style={{ fontSize: 'clamp(36px, 5vw, 58px)', color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: 20, animationDelay: '0.2s' }}
            >
              Verified help, delivered with <span className="gradient-text">dignity</span>.
            </h1>
            <p
              className="animate-fade-up"
              style={{ fontSize: 17, color: 'rgba(255,255,255,0.68)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480, animationDelay: '0.3s' }}
            >
              ApnaAsra is an AI-powered platform that intelligently matches individuals in need with the right verified NGOs and CSR partners - turning every request into tracked, measurable support.
            </p>
            <div className="animate-fade-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24, marginBottom: 44, animationDelay: '0.4s' }}>
              <button className="btn-primary" onClick={() => nav('individuals')}>
                I need help
              </button>
              <button
                onClick={() => nav('ngos')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, padding: '13px 2px', fontFamily: 'Inter, sans-serif', transition: 'gap 0.2s, color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.gap = '10px'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--java)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.gap = '6px'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)' }}
              >
                I represent an NGO or company <span>→</span>
              </button>
            </div>

            {/* Trust stat row */}
            <div className="animate-fade-up" style={{ display: 'flex', flexWrap: 'wrap', animationDelay: '0.5s', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 24 }}>
              {[
                { value: '2,400+', label: 'Verified cases' },
                { value: '84', label: 'NGO partners' },
                { value: '47', label: 'CSR partners' },
              ].map((stat, i) => (
                <div key={stat.label} style={{ paddingRight: 28, marginRight: i < 2 ? 28 : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'white', fontVariantNumeric: 'tabular-nums' }}>{stat.value}</div>
                  <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — live case preview */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 380 }}>
            {/* Back card — stat panel offset behind */}
            <div
              className="animate-fade-up animate-delay-3"
              style={{
                position: 'absolute', top: '4%', right: '4%', width: 190,
                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 16, padding: '18px 20px', transform: 'rotate(4deg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, color: 'var(--java-light)' }}>
                <ChartIcon size={16} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>Impact score</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'white' }}>94<span style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>/100</span></div>
            </div>

            {/* Front card — live verified case */}
            <div
              className="animate-float"
              style={{
                position: 'relative', zIndex: 1, width: '100%', maxWidth: 340,
                background: 'white', borderRadius: 20, padding: 24,
                boxShadow: '0 30px 70px rgba(2,10,30,0.45)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live verified case</span>
                <img src={logoImg} alt="ApnaAsra" style={{ width: 22, height: 22, objectFit: 'contain', opacity: 0.85 }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, var(--java), var(--downriver))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>AK</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--downriver)' }}>Ayesha Khan</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>F-8, Islamabad · Medical support</div>
                </div>
                <span className="badge-verified" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                  <CheckIcon size={11} /> Verified
                </span>
              </div>

              <div style={{ marginBottom: 4, display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--text-muted)' }}>
                <span>Rs. 18,000 raised</span>
                <span>of Rs. 25,000</span>
              </div>
              <div style={{ height: 8, borderRadius: 20, background: 'var(--bg)', overflow: 'hidden', marginBottom: 18 }}>
                <div style={{ width: '72%', height: '100%', borderRadius: 20, background: 'linear-gradient(90deg, var(--java), var(--java-dark))' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 16, borderTop: '1px solid var(--border-col)' }}>
                <BuildingIcon size={15} style={{ color: 'var(--java-dark)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Supported by Sahara Foundation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '96px 24px', background: 'white' }} ref={featuresRef}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>How It Works</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--downriver)', marginBottom: 16 }}>
              Three steps to real impact
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Our verified pipeline ensures every request is genuine and every rupee of support reaches the right family.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {steps.map((step, i) => (
              <div
                key={i}
                className="hover-card tilt-card"
                onMouseMove={tiltMove}
                onMouseLeave={tiltLeave}
                style={{
                  padding: '36px 28px',
                  borderRadius: 20,
                  border: '1px solid var(--border-col)',
                  background: step.accent,
                  opacity: featVisible ? 1 : 0,
                  transform: featVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--java-dark)', marginBottom: 20, boxShadow: '0 4px 12px rgba(9,34,86,0.1)' }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--java-dark)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Step {i + 1}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--downriver)', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Audiences ── */}
      <section style={{ padding: '96px 24px', background: 'var(--bg)' }} ref={audsRef}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Who We Serve</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--downriver)' }}>
              Built for every stakeholder
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {audiences.map((aud, i) => (
              <div
                key={i}
                className="hover-card tilt-card"
                onMouseMove={tiltMove}
                onMouseLeave={tiltLeave}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  padding: '36px 28px',
                  border: '1px solid var(--border-col)',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: audsVisible ? 1 : 0,
                  transform: audsVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, var(--java), var(--downriver))` }} />
                <div style={{ color: aud.accentDark, marginBottom: 16 }}>{aud.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--downriver)', marginBottom: 6 }}>{aud.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--java-dark)', fontWeight: 600, marginBottom: 20 }}>{aud.sub}</p>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {aud.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--java)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => nav(aud.page)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--java-dark)', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontFamily: 'Inter, sans-serif', transition: 'gap 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.gap = '10px' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.gap = '6px' }}
                >
                  Learn more <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Metrics ── */}
      <section style={{ padding: '96px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Impact</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--downriver)' }}>
              Numbers that matter
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <MetricCard value="2,400+" label="Verified cases" icon={<CheckIcon size={28} />} delay={0} />
            <MetricCard value="1,800+" label="Families supported" icon={<UsersIcon size={28} />} delay={100} />
            <MetricCard value="84" label="Partner NGOs & orphanages" icon={<BuildingIcon size={28} />} delay={200} />
            <MetricCard value="47" label="CSR partners" icon={<BriefcaseIcon size={28} />} delay={300} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-gradient" style={{ padding: '96px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Join ApnaAsra and turn local support into verified impact.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', marginBottom: 40, lineHeight: 1.65 }}>
            Whether you run an NGO, lead a CSR initiative, or simply need help - there is a place for you here.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <button className="btn-primary" style={{ background: 'white', color: 'var(--downriver)' }} onClick={() => nav('ngos')}>
              For NGOs & orphanages - Get Started
            </button>
            <button className="btn-outline" onClick={() => nav('companies')}>
              For Companies - Request a demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
