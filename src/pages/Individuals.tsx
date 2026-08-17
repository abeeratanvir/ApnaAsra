import { useState } from 'react'
import { tiltMove, tiltLeave, spotlightMove } from '@/lib/tilt'
import ConfettiBurst from '@/components/ConfettiBurst'
import { LockIcon, ClockIcon, BellIcon, CheckIcon, DocumentIcon, ClipboardIcon } from '@/components/icons'

type Page = 'home' | 'individuals' | 'ngos' | 'companies' | 'impact'

interface IndividualsProps {
  onNavigate: (page: Page) => void
}

export default function Individuals({ onNavigate }: IndividualsProps) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    city: '',
    helpType: '',
    description: '',
    urgency: '',
    contactTime: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const steps = [
    { icon: <LockIcon size={26} />, title: 'Private & secure', desc: 'Your details are only shared with verified NGO partners - never public.' },
    { icon: <ClockIcon size={26} />, title: '24-72 hour review', desc: 'A verified local NGO will review your request within 1–3 working days.' },
    { icon: <BellIcon size={26} />, title: 'You get notified', desc: 'Receive status updates via the contact you provided.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section
        className="hero-gradient"
        onMouseMove={spotlightMove}
        style={{ paddingTop: 120, paddingBottom: 72, textAlign: 'center' }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
          <button
            onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'rgba(255,255,255,0.8)', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 32, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'}
          >
            ← Back to Home
          </button>
          <div className="section-label animate-fade-up" style={{ justifyContent: 'center', animationDelay: '0.1s' }}>
            For Individuals & Families
          </div>
          <h1 className="font-display animate-fade-up" style={{ fontSize: 'clamp(30px, 5vw, 52px)', color: 'white', fontWeight: 700, lineHeight: 1.15, marginBottom: 16, animationDelay: '0.2s' }}>
            Need support?
          </h1>
          <p className="animate-fade-up" style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, animationDelay: '0.3s' }}>
            ApnaAsra connects you to verified local help - food, education, medical support, shelter, and more. Your request is reviewed by trusted NGOs, completely free of charge.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {submitted ? (
            <div
              style={{ position: 'relative', overflow: 'hidden', background: 'white', borderRadius: 24, padding: '56px 40px', textAlign: 'center', boxShadow: '0 8px 40px rgba(9,34,86,0.10)', border: '1px solid var(--border-col)' }}
              className="animate-fade-up"
            >
              <ConfettiBurst />
              <div className="success-pop" style={{ width: 80, height: 80, background: 'linear-gradient(135deg, var(--java), var(--java-dark))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 24px', boxShadow: '0 0 0 8px rgba(29,191,191,0.15)' }}><CheckIcon size={36} /></div>
              <h2 className="font-display" style={{ fontSize: 32, color: 'var(--downriver)', marginBottom: 12 }}>Request submitted!</h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                Thank you, <strong style={{ color: 'var(--downriver)' }}>{form.name || 'friend'}</strong>. Your request has been received and will be reviewed by a verified local NGO within 24–72 hours. We will reach out to you at the contact you provided.
              </p>
              <div style={{ background: 'rgba(29,191,191,0.08)', borderRadius: 12, padding: '16px 20px', marginBottom: 32, border: '1px solid rgba(29,191,191,0.2)', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <ClipboardIcon size={16} style={{ color: 'var(--java-dark)', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  <strong>Reference ID:</strong> AA-{Math.floor(Math.random() * 90000) + 10000} · Your case is now in our system.
                </p>
              </div>
              <button className="btn-primary" onClick={() => setSubmitted(false)} style={{ marginRight: 12 }}>
                Submit another request
              </button>
              <button className="btn-navy" onClick={() => { onNavigate('home'); window.scrollTo({ top: 0 }) }}>
                Back to Home
              </button>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', boxShadow: '0 8px 40px rgba(9,34,86,0.08)', border: '1px solid var(--border-col)' }} className="animate-fade-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--java), var(--downriver))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><DocumentIcon size={20} /></div>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--downriver)', margin: 0 }}>Submit a help request</h2>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, marginTop: 2 }}>All fields marked * are required</p>
                </div>
              </div>
              <div style={{ height: 1, background: 'var(--border-col)', margin: '20px 0 28px' }} />

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Full name *</label>
                    <input className="form-input" type="text" placeholder="Ayesha Khan" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Contact (phone or email) *</label>
                    <input className="form-input" type="text" placeholder="+92 300 1234567" required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Sector / Area *</label>
                  <input className="form-input" type="text" placeholder="e.g. F-8, Islamabad" required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Type of help needed *</label>
                  <select className="form-input" required value={form.helpType} onChange={e => setForm({ ...form, helpType: e.target.value })} style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Select a category</option>
                    <option>Food & nutrition</option>
                    <option>Education & books</option>
                    <option>Medical & healthcare</option>
                    <option>Shelter & housing</option>
                    <option>Livelihood & employment</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Describe your situation *</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Please describe your need in a few lines. Be as specific as you can - this helps the NGO assist you faster."
                    required
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    style={{ resize: 'vertical', minHeight: 100 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Urgency level</label>
                    <select className="form-input" value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })} style={{ appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select (optional)</option>
                      <option>Urgent - within 48 hours</option>
                      <option>High - within a week</option>
                      <option>Moderate - within a month</option>
                      <option>Low - no rush</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Preferred contact time</label>
                    <select className="form-input" value={form.contactTime} onChange={e => setForm({ ...form, contactTime: e.target.value })} style={{ appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select (optional)</option>
                      <option>Morning (8 AM – 12 PM)</option>
                      <option>Afternoon (12 PM – 4 PM)</option>
                      <option>Evening (4 PM – 8 PM)</option>
                      <option>Anytime</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: 8, justifyContent: 'center', padding: '15px 28px', fontSize: 15 }}>
                  Submit for verification
                </button>
              </form>

              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <LockIcon size={14} /> Your request will be reviewed by a verified local NGO. Your personal details are kept private.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* What happens next */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>After you submit</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--downriver)' }}>What happens next</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {steps.map((step, i) => (
              <div
                key={i}
                className="hover-card tilt-card"
                onMouseMove={tiltMove}
                onMouseLeave={tiltLeave}
                style={{ padding: '28px 24px', borderRadius: 16, border: '1px solid var(--border-col)', background: 'var(--bg)' }}
              >
                <div style={{ color: 'var(--java-dark)', marginBottom: 12 }}>{step.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--downriver)', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
