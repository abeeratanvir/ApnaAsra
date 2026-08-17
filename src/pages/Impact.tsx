import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { tiltMove, tiltLeave, spotlightMove } from '@/lib/tilt'
import { CheckIcon, UsersIcon, BuildingIcon, BriefcaseIcon, TargetIcon, BoltIcon } from '@/components/icons'

type Page = 'home' | 'individuals' | 'ngos' | 'companies' | 'impact'

interface ImpactProps {
  onNavigate: (page: Page) => void
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const stories = [
  {
    initials: 'AK',
    name: 'Ayesha & her family',
    location: 'F-8, Islamabad',
    category: 'Food support',
    date: 'June 2025',
    story: '"After my husband lost his job, I didn\'t know how we would feed our three children. ApnaAsra connected us to Umeed Foundation within two days. We received a month of ration support and my husband is now back in work."',
    ngo: 'Umeed Foundation',
    impact: 'Food for 1 month · Family of 5',
    color: '#e8fff8',
    accent: '#059669',
  },
  {
    initials: 'EO',
    name: 'Ehsaas Orphanage',
    location: 'F-11, Islamabad',
    category: 'Education',
    date: 'May 2025',
    story: '"48 children in our care now have textbooks, uniforms, and stationery for the entire school year. The support through ApnaAsra\'s corporate partners made this possible - something we couldn\'t achieve through our usual fundraising."',
    ngo: 'Partner NGO: Ehsaas Orphanage',
    impact: '48 children · School year 2025–26',
    color: '#e8f4ff',
    accent: '#1e40af',
  },
  {
    initials: 'TS',
    name: 'TechBridge Solutions',
    location: 'CSR Partner',
    category: 'Corporate CSR',
    date: 'April 2025',
    story: '"We\'ve been able to report verified impact to our board for the first time. Each rupee we give is tied to a specific verified case with real outcomes. ApnaAsra replaced a generic CSR donation with something our team is genuinely proud of."',
    ngo: 'Supported 14 cases across Islamabad',
    impact: 'Rs. 3.2L CSR invested · 14 verified cases',
    color: '#f0ebff',
    accent: '#7c3aed',
  },
  {
    initials: 'HS',
    name: 'Hamza Sheikh',
    location: 'G-9, Islamabad',
    category: 'Medical support',
    date: 'July 2025',
    story: '"My 8-year-old has chronic asthma. The medication costs were impossible for us. A company through ApnaAsra pledged 6 months of treatment. He has not missed school in 2 months - something that never happened before."',
    ngo: 'Sahara Foundation',
    impact: '6-month medication covered · Child, age 8',
    color: '#fff7e8',
    accent: '#d97706',
  },
]

const timeline = [
  { date: 'Jan 2024', event: 'ApnaAsra launched', desc: 'First pilot in Islamabad with 3 NGO partners and 12 verified cases.' },
  { date: 'Apr 2024', event: 'First CSR partner', desc: 'TechBridge Solutions joined - the first company to fund verified cases through the platform.' },
  { date: 'Jul 2024', event: '500 families reached', desc: 'Milestone: 500 families supported across Islamabad.' },
  { date: 'Oct 2024', event: '25 NGO partners', desc: 'Expanded to 25 verified NGO and orphanage partners across 8 sectors.' },
  { date: 'Jan 2025', event: 'Impact dashboard launched', desc: 'Companies can now track real-time CSR impact with verified reports.' },
  { date: 'Jun 2025', event: '1,800+ families', desc: 'Over 1,800 families supported with verified, measurable outcomes.' },
  { date: 'Jul 2025', event: '47 CSR partners', desc: '47 companies actively funding verified local cases. Rs. 12.4L total CSR invested.' },
]

function MetricTile({ m, visible, delay }: { m: { value: string; label: string; icon: ReactNode; sub: string }; visible: boolean; delay: number }) {
  const animatedValue = useCountUp(m.value, visible)
  return (
    <div
      className="hover-card tilt-card"
      onMouseMove={tiltMove}
      onMouseLeave={tiltLeave}
      style={{
        background: 'var(--bg)',
        borderRadius: 16,
        padding: '28px 24px',
        border: '1px solid var(--border-col)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div style={{ color: 'var(--java-dark)', marginBottom: 12 }}>{m.icon}</div>
      <div className="font-display" style={{ fontSize: 36, color: 'var(--downriver)', lineHeight: 1 }}>{animatedValue}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginTop: 6, marginBottom: 4 }}>{m.label}</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{m.sub}</div>
    </div>
  )
}

export default function Impact({ onNavigate }: ImpactProps) {
  const metricsView = useInView()
  const storiesView = useInView()

  const metrics = [
    { value: '2,400+', label: 'Verified cases processed', icon: <CheckIcon size={26} />, sub: 'All reviewed by certified NGOs' },
    { value: '1,800+', label: 'Families supported', icon: <UsersIcon size={26} />, sub: 'Across 12 sectors in Islamabad' },
    { value: '84', label: 'NGO & orphanage partners', icon: <BuildingIcon size={26} />, sub: 'Verified and certified' },
    { value: '47', label: 'CSR company partners', icon: <BriefcaseIcon size={26} />, sub: 'Rs. 12.4L total invested' },
    { value: '94%', label: 'Verification accuracy', icon: <TargetIcon size={26} />, sub: 'Independently audited' },
    { value: '< 48h', label: 'Avg. response time', icon: <BoltIcon size={26} />, sub: 'From submission to NGO contact' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient" onMouseMove={spotlightMove} style={{ paddingTop: 120, paddingBottom: 72, textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
          <button
            onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'rgba(255,255,255,0.8)', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 32, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            ← Back to Home
          </button>
          <div className="section-label animate-fade-up" style={{ justifyContent: 'center' }}>
            Our Impact
          </div>
          <h1 className="font-display animate-fade-up" style={{ fontSize: 'clamp(30px, 5vw, 56px)', color: 'white', fontWeight: 700, lineHeight: 1.1, marginBottom: 16, animationDelay: '0.2s' }}>
            Real numbers.<br />Real families. Real change.
          </h1>
          <p className="animate-fade-up" style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, animationDelay: '0.3s' }}>
            Every verified case, every rupee invested, every family supported - tracked transparently on ApnaAsra.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>The numbers</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--downriver)' }}>Impact at a glance</h2>
          </div>
          <div ref={metricsView.ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {metrics.map((m, i) => (
              <MetricTile key={i} m={m} visible={metricsView.visible} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Stories</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--downriver)' }}>Behind the numbers</h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7 }}>
              Each statistic is a real person. Here are a few of them.
            </p>
          </div>
          <div ref={storiesView.ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {stories.map((s, i) => (
              <div
                key={i}
                className="hover-card tilt-card"
                onMouseMove={tiltMove}
                onMouseLeave={tiltLeave}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid var(--border-col)',
                  boxShadow: '0 2px 12px rgba(9,34,86,0.06)',
                  opacity: storiesView.visible ? 1 : 0,
                  transform: storiesView.visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}
              >
                <div style={{ background: s.color, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: s.accent, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{s.initials}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--downriver)' }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.location}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ background: s.accent, color: 'white', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{s.category}</span>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>{s.date}</div>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 20 }}>{s.story}</p>
                  <div style={{ borderTop: '1px solid var(--border-col)', paddingTop: 16 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{s.ngo}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: s.accent }}>{s.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Our journey</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--downriver)' }}>Growth timeline</h2>
          </div>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 10, top: 8, bottom: 8, width: 2, background: 'linear-gradient(to bottom, var(--java), var(--downriver))' }} />
            {timeline.map((t, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: i < timeline.length - 1 ? 36 : 0 }}>
                <div style={{ position: 'absolute', left: -28, top: 4, width: 14, height: 14, borderRadius: '50%', background: 'var(--java)', border: '2px solid white', boxShadow: '0 0 0 3px rgba(29,191,191,0.2)', animation: 'glowPulse 2.4s ease-in-out infinite' }} />
                <div className="hover-card tilt-card" onMouseMove={tiltMove} onMouseLeave={tiltLeave} style={{ background: 'var(--bg)', borderRadius: 12, padding: '18px 20px', border: '1px solid var(--border-col)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--downriver)', margin: 0 }}>{t.event}</h3>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--java-dark)', background: 'rgba(29,191,191,0.1)', padding: '3px 10px', borderRadius: 20 }}>{t.date}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-gradient" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Be part of the next chapter.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
            Every case verified, every company that joins, every family reached adds to this story.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <button className="btn-primary" style={{ background: 'white', color: 'var(--downriver)' }} onClick={() => { onNavigate('individuals'); window.scrollTo({ top: 0 }) }}>
              I need help
            </button>
            <button className="btn-outline" onClick={() => { onNavigate('companies'); window.scrollTo({ top: 0 }) }}>
              Partner with us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
