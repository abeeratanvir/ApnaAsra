import { useState } from 'react'
import { spotlightMove } from '@/lib/tilt'
import { BuildingIcon, CheckIcon, InfoIcon } from '@/components/icons'

type Page = 'home' | 'individuals' | 'ngos' | 'companies' | 'impact'
type Status = 'Pending' | 'Verified' | 'More info needed'

interface NGOsProps {
  onNavigate: (page: Page) => void
}

interface Case {
  id: string
  name: string
  area: string
  helpType: string
  status: Status
  contact: string
  description: string
  urgency: string
  submitted: string
}

const sampleCases: Case[] = [
  { id: 'AA-10234', name: 'Ayesha Khan', area: 'F-8, Islamabad', helpType: 'Food & nutrition', status: 'Pending', contact: '+92 300 1234567', description: 'Family of 5 with two young children. Father lost employment. Need food support for 2 months.', urgency: 'High — within a week', submitted: 'Jul 28, 2025' },
  { id: 'AA-10198', name: 'Hamza Sheikh', area: 'G-9, Islamabad', helpType: 'Medical & healthcare', status: 'Verified', contact: '+92 301 2345678', description: 'Child aged 8 requires medication for chronic asthma. Family cannot afford recurring treatment costs.', urgency: 'Urgent — within 48 hours', submitted: 'Jul 25, 2025' },
  { id: 'AA-10176', name: 'Rukhsana Bibi', area: 'I-8, Islamabad', helpType: 'Education & books', status: 'More info needed', contact: 'rukhsana.b@email.com', description: 'Three children enrolled in government school. Need textbooks, stationery and school uniforms.', urgency: 'Moderate — within a month', submitted: 'Jul 22, 2025' },
  { id: 'AA-10155', name: 'Bilal Ahmed', area: 'F-10, Islamabad', helpType: 'Shelter & housing', status: 'Pending', contact: '+92 302 3456789', description: 'Lost home to flooding. Family of 4 staying in community shelter temporarily.', urgency: 'Urgent — within 48 hours', submitted: 'Jul 20, 2025' },
  { id: 'AA-10142', name: 'Farzana Malik', area: 'G-11, Islamabad', helpType: 'Livelihood & employment', status: 'Verified', contact: 'farzana.m@gmail.com', description: 'Single mother seeking support to start a small tailoring business. Needs a sewing machine.', urgency: 'Moderate — within a month', submitted: 'Jul 17, 2025' },
]

export default function NGOs({ onNavigate }: NGOsProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [cases, setCases] = useState<Case[]>(sampleCases)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [notes, setNotes] = useState('')
  const [verifiedMsg, setVerifiedMsg] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoggedIn(true)
  }

  const handleVerify = (status: Status) => {
    if (!selectedCase) return
    setCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status } : c))
    setVerifiedMsg(status === 'Verified' ? `Case ${selectedCase.id} marked as Verified.` : `Case ${selectedCase.id} flagged for more information.`)
    setSelectedCase(null)
    setNotes('')
    setTimeout(() => setVerifiedMsg(''), 4000)
  }

  const badgeStyle = (status: Status) => {
    if (status === 'Verified') return 'badge-verified'
    if (status === 'More info needed') return 'badge-moreinfo'
    return 'badge-pending'
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
            For NGOs & Orphanages
          </div>
          <h1 className="font-display animate-fade-up" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: 'white', fontWeight: 700, lineHeight: 1.15, marginBottom: 16, animationDelay: '0.2s' }}>
            For NGOs & orphanages
          </h1>
          <p className="animate-fade-up" style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto', animationDelay: '0.3s' }}>
            Verify cases, manage your support, and show clear impact through ApnaAsra's dedicated NGO portal.
          </p>
        </div>
      </section>

      {/* Login or Dashboard */}
      <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {!loggedIn ? (
            /* Login Card */
            <div style={{ maxWidth: 440, margin: '0 auto' }}>
              <div className="animate-fade-up" style={{ background: 'white', borderRadius: 24, padding: '44px 40px', boxShadow: '0 8px 40px rgba(9,34,86,0.10)', border: '1px solid var(--border-col)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--downriver), var(--java-dark))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><BuildingIcon size={20} /></div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--downriver)', margin: 0 }}>NGO Login</h2>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Access your verification dashboard</p>
                  </div>
                </div>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Email address</label>
                    <input className="form-input" type="email" placeholder="ngo@example.org" required value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Password</label>
                    <input className="form-input" type="password" placeholder="••••••••" required value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: 8 }}>
                    Login to Dashboard →
                  </button>
                </form>
                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 16 }}>
                  Not registered yet?{' '}
                  <span style={{ color: 'var(--java-dark)', fontWeight: 600, cursor: 'pointer' }}>Request NGO access</span>
                </p>
              </div>
            </div>
          ) : selectedCase ? (
            /* Request Detail View */
            <div className="animate-fade-up" style={{ background: 'white', borderRadius: 24, padding: '40px 36px', boxShadow: '0 8px 40px rgba(9,34,86,0.10)', border: '1px solid var(--border-col)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <button
                  onClick={() => setSelectedCase(null)}
                  style={{ background: 'var(--bg)', border: '1px solid var(--border-col)', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  ← Back to dashboard
                </button>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Request Verification</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                {[
                  ['Reference ID', selectedCase.id],
                  ['Name', selectedCase.name],
                  ['Contact', selectedCase.contact],
                  ['Sector / Area', selectedCase.area],
                  ['Type of help', selectedCase.helpType],
                  ['Urgency', selectedCase.urgency],
                  ['Submitted', selectedCase.submitted],
                  ['Current status', selectedCase.status],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>
                      {label === 'Current status' ? (
                        <span className={badgeStyle(selectedCase.status as Status)}>{value}</span>
                      ) : value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, border: '1px solid var(--border-col)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Description</div>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{selectedCase.description}</p>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>NGO notes (optional)</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Add any notes about this case — home visit scheduled, documents received, etc."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => handleVerify('Verified')} style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
                  <CheckIcon size={16} /> Mark as Verified
                </button>
                <button className="btn-primary" onClick={() => handleVerify('More info needed')} style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}>
                  <InfoIcon size={16} /> More info needed
                </button>
              </div>
            </div>
          ) : (
            /* Dashboard */
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
                <div>
                  <h2 className="font-display" style={{ fontSize: 28, color: 'var(--downriver)', margin: 0 }}>Case dashboard</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>Review and verify incoming help requests</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ background: 'white', borderRadius: 10, padding: '10px 18px', border: '1px solid var(--border-col)', textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--downriver)' }}>{cases.filter(c => c.status === 'Pending').length}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Pending</div>
                  </div>
                  <div style={{ background: 'white', borderRadius: 10, padding: '10px 18px', border: '1px solid var(--border-col)', textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#059669' }}>{cases.filter(c => c.status === 'Verified').length}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Verified</div>
                  </div>
                </div>
              </div>

              {verifiedMsg && (
                <div className="success-pop" style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 10, padding: '12px 18px', marginBottom: 20, color: '#065f46', fontSize: 14, fontWeight: 500 }}>
                  {verifiedMsg}
                </div>
              )}

              {/* Table */}
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border-col)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(9,34,86,0.06)' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}>
                        {['ID', 'Name', 'Sector', 'Type of help', 'Submitted', 'Status', 'Action'].map(h => (
                          <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cases.map((c, i) => (
                        <tr
                          key={c.id}
                          style={{ borderBottom: i < cases.length - 1 ? '1px solid var(--border-col)' : 'none', transition: 'background 0.15s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(29,191,191,0.04)'}
                          onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                        >
                          <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: 500 }}>{c.id}</td>
                          <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>{c.name}</td>
                          <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{c.area}</td>
                          <td style={{ padding: '14px 16px', color: 'var(--text)' }}>{c.helpType}</td>
                          <td style={{ padding: '14px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{c.submitted}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className={badgeStyle(c.status)}>{c.status}</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <button
                              onClick={() => { setSelectedCase(c); setNotes('') }}
                              style={{ background: 'var(--bg)', border: '1px solid var(--border-col)', borderRadius: 8, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'var(--downriver)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--java)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--java)' }}
                              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--downriver)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-col)' }}
                            >
                              View & verify →
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
    </div>
  )
}
