'use client'
import { useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setStatus('sent')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="policy-page">
      <div className="contact-wrap">
        <Link href="/" className="policy-back">← Back to home</Link>

        <div className="contact-grid">

          {/* Left — info */}
          <div className="contact-info">
            <div className="story-eyebrow">Get in touch</div>
            <h1>We&apos;d love to <span className="h-red">hear from you</span></h1>
            <p>Whether you have a question about an order, want to know more about how it works, or just want to say hi — we&apos;re here and we reply fast.</p>

            <div className="contact-items">
              <div className="contact-item">
                <span className="ci-icon"><Icon name="heart" size={20} /></span>
                <div>
                  <div className="ci-label">Response time</div>
                  <div className="ci-val">Within 1–2 business days</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="ci-icon"><Icon name="shield" size={20} /></span>
                <div>
                  <div className="ci-label">Order issues</div>
                  <div className="ci-val">We always make it right</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="ci-icon"><Icon name="book" size={20} /></span>
                <div>
                  <div className="ci-label">Quick answers</div>
                  <div className="ci-val"><Link href="/#faq">Check our FAQ first →</Link></div>
                </div>
              </div>
            </div>

          </div>

          {/* Right — form */}
          <div className="contact-form-wrap">
            {status === 'sent' ? (
              <div className="contact-success">
                <div className="succ-check" style={{ width: 80, height: 80, margin: '0 auto 20px' }}>
                  <Icon name="check" size={38} stroke={3} />
                </div>
                <h2>Message sent!</h2>
                <p>Thanks for reaching out. We&apos;ll be in touch within 1–2 business days. Check your inbox for a confirmation.</p>
                <button className="btn btn-gold" style={{ marginTop: 24 }} onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-row">
                  <div className="field">
                    <label>Your name</label>
                    <input className="inp" placeholder="Jane Smith" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className="field">
                    <label>Email address</label>
                    <input className="inp" type="email" placeholder="jane@example.com" value={form.email} onChange={set('email')} required />
                  </div>
                </div>
                <div className="field">
                  <label>Subject</label>
                  <select className="inp" value={form.subject} onChange={set('subject')}>
                    <option value="">Select a topic…</option>
                    <option value="Order question">Question about an order</option>
                    <option value="Book preview feedback">Book preview feedback</option>
                    <option value="Refund or return">Refund or return</option>
                    <option value="Bulk / gift orders">Bulk or gift orders</option>
                    <option value="General question">General question</option>
                    <option value="Other">Something else</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea
                    className="ta"
                    rows={6}
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={set('message')}
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className="checkout-error">
                    <Icon name="close" size={15} />{errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-navy btn-lg btn-block"
                  disabled={status === 'sending'}
                >
                  {status === 'sending'
                    ? <><Icon name="refresh" size={18} className="spin" /> Sending…</>
                    : <><Icon name="arrow" size={18} /> Send message</>}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
