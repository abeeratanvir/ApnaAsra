import { useState, type ReactNode } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { tiltMove, tiltLeave, spotlightMove } from '@/lib/tilt'
import ConfettiBurst from '@/components/ConfettiBurst'
import { CheckIcon, HandshakeIcon, ChartIcon, CurrencyIcon } from '@/components/icons'

type Page = 'home' | 'individuals' | 'ngos' | 'companies' | 'impact'

interface CompaniesProps {
  onNavigate: (page: Page) => void
}

interface CaseItem {
  id: string
  name: string
  helpType: string
  status: 'In progress' | 'Completed' | 'Verified'
  location: string
  ngo: string
  description: string
  impactNotes: string
  funds: string
  date: string
}

const sampleCases: CaseItem[] = [
  { id: 'AA-10198', name: 'Hamza Sheikh – Medical support', helpType: 'Medical & healthcare', status: 'In progress', location: 'G-9, Islamabad', ngo: 'Sahara Foundation', description: 'Child aged 8 requires ongoing asthma medication. Monthly treatment cost covered.', impactNotes: 'Funds pledged for 6-month medication supply. First disbursement confirmed.', funds: 'Rs. 18,000 pledged', date: 'Jul 25, 2025' },
  { id: 'AA-10142', name: 'Farzana Malik – Livelihood', helpType: 'Livelihood & employment', status: 'Completed', location: 'G-11, Islamabad', ngo: 'Ummeed NGO', description: 'Single mother supported to start a tailoring business.', impactNotes: 'Sewing machine provided. Business operational since Aug 2025. Monthly income: Rs. 8,000.', funds: 'Rs. 12,500 contributed', date: 'Jul 17, 2025' },
  { id: 'AA-10088', name: 'Orphanage - Book drive', helpType: 'Education & books', status: 'Completed', location: 'F-11, Islamabad', ngo: 'Ehsaas Orphanage', description: 'Annual school supplies drive for 48 resident children.', impactNotes: 'Books, stationery, and uniforms distributed to all 48 children. School year 2025–26.', funds: 'Rs. 42,000 contributed', date: 'Jun 10, 2025' },
  { id: 'AA-10155', name: 'Bilal Ahmed – Shelter', helpType: 'Shelter & housing', status: 'In progress', location: 'F-10, Islamabad', ngo: 'Khidmat Trust', description: 'Family displaced by flooding needs temporary shelter support.', impactNotes: 'Rental assistance arranged. Permanent housing application in process.', funds: 'Rs. 25,000 pledged', date: 'Jul 20, 2025' },
]

function MetricTile({ m }: { m: { icon: ReactNode; value: string; label: string; color: string } }) {
  const animatedValue = useCountUp(m.value, true)
  return (
    <div className="hover-card tilt-card" onMouseMove={tiltMove} onMouseLeave={tiltLeave} style={{ background: 'white', borderRadius: 16, padding: '24px 20px', textAlign: 'center', boxShadow: '0 2px 12px rgba(9,34,86,0.07)', border: '1px solid var(--border-col)' }}>
      <div style={{ color: 'var(--java-dark)', marginBottom: 10, display: 'flex', justifyContent: 'center' }}>{m.icon}</div>
      <div className="font-display" style={{ fontSize: 28, color: 'var(--downriver)' }}>{animatedValue}</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{m.label}</div>
    </div>
  )
}

export default function Companies({ onNavigate }: CompaniesProps) {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null)
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [demoForm, setDemoForm] = useState({ company: '', name: '', email: '', message: '' })

  const statusClass = (s: string) => {
    if (s === 'Completed') return 'badge-completed'
    if (s === 'In progress') return 'badge-progress'
    return 'badge-verified'
  }

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient" onMouseMove={spotlightMove} style={{ paddingTop: 120, paddingBottom: 72 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <button
            onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'rgba(255,255,255,0.8)', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 32, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            ← Back to Home
          </button>
          <div className="section-label animate-fade-up" style={{ justifyContent: 'center' }}>
            For Companies & CSR Teams
          </div>
          <h1 className="font-display animate-fade-up" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: 'white', fontWeight: 700, lineHeight: 1.15, marginBottom: 16, animationDelay: '0.2s' }}>
            For Companies & CSR teams
          </h1>
          <p className="animate-fade-up" style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto', animationDelay: '0.3s' }}>
            Support verified local cases and track your impact with ApnaAsra's CSR dashboard - real data, real families, measurable results.
          </p>
        </div>
      </section>

      {/* Dashboard or Case Detail */}
      <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {selectedCase ? (
            /* Case Detail */
            <div className="animate-fade-up" style={{ background: 'white', borderRadius: 24, padding: '40px 36px', boxShadow: '0 8px 40px rgba(9,34,86,0.10)', border: '1px solid var(--border-col)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <button
                  onClick={() => setSelectedCase(null)}
                  style={{ background: 'var(--bg)', border: '1px solid var(--border-col)', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  ← Back to CSR dashboard
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 28 }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--downriver)', marginBottom: 4 }}>{selectedCase.name}</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{selectedCase.id} · {selectedCase.date}</p>
                </div>
                <span className={statusClass(selectedCase.status)} style={{ fontSize: 13, padding: '5px 14px' }}>{selectedCase.status}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                {[
                  ['Type of help', selectedCase.helpType],
                  ['NGO Partner', selectedCase.ngo],
                  ['Location', selectedCase.location],
                  ['Funds committed', selectedCase.funds],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '18px 20px', marginBottom: 16, border: '1px solid var(--border-col)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Case summary</div>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{selectedCase.description}</p>
              </div>

              <div style={{ background: 'rgba(29,191,191,0.06)', borderRadius: 12, padding: '18px 20px', border: '1px solid rgba(29,191,191,0.2)' }}>
                <div style={{ fontSize: 12, color: 'var(--java-dark)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Impact notes</div>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{selectedCase.impactNotes}</p>
              </div>
            </div>
          ) : (
            /* Dashboard */
            <div>
              {/* Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
                {[
                  { icon: <CheckIcon size={26} />, value: '2,400+', label: 'Total verified cases', color: '#e8fff8' },
                  { icon: <HandshakeIcon size={26} />, value: '84', label: 'Cases our company supports', color: '#e8f4ff' },
                  { icon: <ChartIcon size={26} />, value: '94/100', label: 'Impact score', color: '#f0ebff' },
                  { icon: <CurrencyIcon size={26} />, value: 'Rs. 12.4L', label: 'Total CSR invested', color: '#fff7e8' },
                ].map((m, i) => (
                  <MetricTile key={i} m={m} />
                ))}
              </div>

              {/* Table */}
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--downriver)', marginBottom: 16 }}>Supported cases</h3>
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border-col)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(9,34,86,0.06)' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}>
                        {['Case name', 'Type of help', 'Status', 'Location', 'NGO partner', 'Action'].map(h => (
                          <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sampleCases.map((c, i) => (
                        <tr
                          key={c.id}
                          style={{ borderBottom: i < sampleCases.length - 1 ? '1px solid var(--border-col)' : 'none', transition: 'background 0.15s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(29,191,191,0.04)'}
                          onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                        >
                          <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text)' }}>{c.name}</td>
                          <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{c.helpType}</td>
                          <td style={{ padding: '14px 16px' }}><span className={statusClass(c.status)}>{c.status}</span></td>
                          <td style={{ padding: '14px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{c.location}</td>
                          <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{c.ngo}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <button
                              onClick={() => setSelectedCase(c)}
                              style={{ background: 'var(--bg)', border: '1px solid var(--border-col)', borderRadius: 8, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'var(--downriver)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--java)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--java)' }}
                              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--downriver)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-col)' }}
                            >
                              View case →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA / Demo */}
      <section className="cta-gradient" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', color: 'white', marginBottom: 14, lineHeight: 1.2 }}>
              Ready to make verified local impact?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
              Join 47+ companies that trust ApnaAsra to manage their CSR investment with verified cases, real families, and full impact reporting.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {['Tax-compliant CSR tracking', 'Live impact dashboard', 'Verified NGO network', 'Annual impact reports'].map(f => (
                <span key={f} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{f}</span>
              ))}
            </div>
          </div>

          {demoSubmitted ? (
            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '36px 28px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', overflow: 'hidden' }}>
              <ConfettiBurst />
              <div className="success-pop" style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 16px' }}><CheckIcon size={30} /></div>
              <h3 className="font-display" style={{ color: 'white', fontSize: 22, marginBottom: 8 }}>Demo requested!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.6 }}>
                Thank you, <strong style={{ color: 'white' }}>{demoForm.name}</strong>. Our team will reach out to {demoForm.email} within 2 working days.
              </p>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '32px 28px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <h3 style={{ color: 'white', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Request a demo</h3>
              <form onSubmit={e => { e.preventDefault(); setDemoSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input className="form-input" type="text" placeholder="Company name" required value={demoForm.company} onChange={e => setDemoForm({ ...demoForm, company: e.target.value })} style={{ background: 'rgba(255,255,255,0.9)' }} />
                <input className="form-input" type="text" placeholder="Your name" required value={demoForm.name} onChange={e => setDemoForm({ ...demoForm, name: e.target.value })} style={{ background: 'rgba(255,255,255,0.9)' }} />
                <input className="form-input" type="email" placeholder="Work email" required value={demoForm.email} onChange={e => setDemoForm({ ...demoForm, email: e.target.value })} style={{ background: 'rgba(255,255,255,0.9)' }} />
                <textarea className="form-input" rows={3} placeholder="Tell us about your CSR goals (optional)" value={demoForm.message} onChange={e => setDemoForm({ ...demoForm, message: e.target.value })} style={{ background: 'rgba(255,255,255,0.9)', resize: 'none' }} />
                <button type="submit" style={{ background: 'white', color: 'var(--downriver)', border: 'none', borderRadius: 10, padding: '13px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--java-light)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}
                >
                  Talk to us →
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
