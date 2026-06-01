'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import { STYLES } from '@/lib/constants'
import type { Review } from '../api/reviews/route'

const SEED_REVIEWS: Review[] = [
  { id: '1', name: 'Sarah M.', role: 'Mom of Leo, age 6', color: '#FFD45E', stars: 5, style: 'Pixar 3D', date: 'May 2026', text: "Leo gasped when he saw himself on the cover. He's asked to read it every single night for two weeks straight. I've bought personalized books before and they never came close to this — it's actually his story, not just his name pasted in." },
  { id: '2', name: 'David & Priya K.', role: 'Parents of Anaya, age 4', color: '#F2818A', stars: 5, style: 'Anime', date: 'April 2026', text: "The anime style was absolutely perfect for Anaya and the vocabulary was just right for her age. She calls it \"my special book\" and won't let anyone else touch it." },
  { id: '3', name: 'Marcus T.', role: 'Dad of twins, age 8', color: '#7EC4EB', stars: 5, style: 'Superhero', date: 'April 2026', text: "Got one for each twin with completely different stories and styles. Best birthday gift we've ever given, full stop. They actually argued (nicely) about whose book was better. Worth every penny." },
  { id: '4', name: 'Grandma Cheryl', role: 'Grandma of Maisie, age 5', color: '#9D8DF1', stars: 5, style: 'Watercolor', date: 'March 2026', text: "I ordered this as a Christmas gift and cried when I saw the preview. Maisie's little face in that watercolor style looked like a painting you'd frame on the wall. I'm already ordering one for my other grandchild." },
  { id: '5', name: 'Jennifer R.', role: 'Mom of Eli, age 7', color: '#6FCF97', stars: 5, style: 'Classic', date: 'March 2026', text: "Eli is a reluctant reader and I was desperate to find something that would get him excited about books. This worked. He sat down and read the whole thing himself the day it arrived. I've recommended it to every parent I know." },
  { id: '6', name: 'Kevin D.', role: 'Dad of Harper, age 5', color: '#FFD45E', stars: 5, style: 'Watercolor', date: 'February 2026', text: "The preview approval step is genius. We asked for one small change and they fixed it same day, no questions asked. That level of care really sets them apart." },
]

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="star-picker" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n} type="button"
          className={`star-btn${n <= (hover || value) ? ' lit' : ''}`}
          onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)} aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          <Icon name="star" size={28} />
        </button>
      ))}
      {value > 0 && <span className="star-label">{['', 'Poor', 'Fair', 'Good', 'Great', 'Amazing!'][value]}</span>}
    </div>
  )
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="rev-card-full">
      <div className="rev-card-top">
        <span className="ava" style={{ background: `radial-gradient(circle at 35% 30%, #fff8, ${r.color})`, width: 48, height: 48, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
        <div>
          <div className="rev-name">{r.name}</div>
          <div className="rev-role">{r.role}{r.date ? ` · ${r.date}` : ''}</div>
        </div>
        {r.style && <div className="rev-style-tag">{r.style}</div>}
      </div>
      <div className="rev-stars">
        {Array.from({ length: r.stars }).map((_, i) => (
          <Icon key={i} name="star" size={16} style={{ color: '#F7B41C' }} />
        ))}
      </div>
      <p className="rev-text">&ldquo;{r.text}&rdquo;</p>
    </div>
  )
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', role: '', stars: 0, style: '', text: '' })
  const [formOpen, setFormOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data: Review[]) => {
        if (Array.isArray(data) && data.length > 0) setReviews(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.stars) { setFormError('Please select a star rating.'); return }
    setSubmitting(true)
    setFormError('')
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setReviews((prev) => [data.review, ...prev])
      setSubmitted(true)
      setFormOpen(false)
      setForm({ name: '', role: '', stars: 0, style: '', text: '' })
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const avgStars = reviews.length
    ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)
    : '4.9'

  return (
    <div className="reviews-page">
      <div className="reviews-wrap">
        <Link href="/" className="policy-back">← Back to home</Link>

        {/* Header */}
        <div className="reviews-hero">
          <div className="story-eyebrow">Customer Reviews</div>
          <h1>The look on their face is <span className="h-red">everything</span></h1>
          <p className="story-lead">Real families. Real reactions. Real little heroes.</p>
          <div className="reviews-summary">
            <div className="rs-score">{avgStars}</div>
            <div className="rs-right">
              <div className="rs-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={24} style={{ color: '#F7B41C' }} />
                ))}
              </div>
              <div className="rs-count">{reviews.length.toLocaleString()}+ verified reviews</div>
            </div>
          </div>
        </div>

        {/* Leave a review */}
        <div className="leave-review-section">
          {submitted && (
            <div className="review-submitted">
              <Icon name="check" size={18} /> Thank you! Your review has been posted.
            </div>
          )}
          {!formOpen ? (
            <button className="btn btn-navy leave-review-btn" onClick={() => setFormOpen(true)}>
              <Icon name="pen" size={16} /> Leave a review
            </button>
          ) : (
            <div className="review-form-card">
              <div className="review-form-header">
                <h3>Share your experience</h3>
                <button className="wz-close" style={{ position: 'static' }} onClick={() => setFormOpen(false)} aria-label="Close">
                  <Icon name="close" size={18} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="review-form">
                <div className="contact-row">
                  <div className="field">
                    <label>Your name <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input className="inp" placeholder="e.g. Sarah M." value={form.name} onChange={set('name')} required />
                  </div>
                  <div className="field">
                    <label>Your role <span className="hint">(optional)</span></label>
                    <input className="inp" placeholder="e.g. Mom of Jake, age 6" value={form.role} onChange={set('role')} />
                  </div>
                </div>
                <div className="contact-row">
                  <div className="field">
                    <label>Star rating <span style={{ color: 'var(--red)' }}>*</span></label>
                    <StarPicker value={form.stars} onChange={(n) => setForm((f) => ({ ...f, stars: n }))} />
                  </div>
                  <div className="field">
                    <label>Illustration style <span className="hint">(optional)</span></label>
                    <select className="inp" value={form.style} onChange={set('style')}>
                      <option value="">Select style…</option>
                      {STYLES.map((s) => <option key={s.id} value={s.name}>{s.emoji} {s.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Your review <span style={{ color: 'var(--red)' }}>*</span></label>
                  <textarea className="ta" rows={4} placeholder="Tell other families what you loved about your book…" value={form.text} onChange={set('text')} maxLength={600} required />
                  <div className="charc">{form.text.length}/600</div>
                </div>
                {formError && (
                  <div className="checkout-error"><Icon name="close" size={14} />{formError}</div>
                )}
                <div className="review-form-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setFormOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-navy btn-lg" disabled={submitting}>
                    {submitting ? <><Icon name="refresh" size={16} className="spin" /> Posting…</> : <><Icon name="check" size={16} /> Post review</>}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Review grid */}
        {loading ? (
          <div className="reviews-loading"><Icon name="refresh" size={24} className="spin" /> Loading reviews…</div>
        ) : (
          <div className="reviews-grid">
            {reviews.map((r) => <ReviewCard key={r.id} r={r} />)}
          </div>
        )}

        {/* CTA */}
        <div className="story-cta" style={{ marginTop: 72 }}>
          <h3>Ready to create yours?</h3>
          <p>Join thousands of families who&apos;ve already made their child the hero.</p>
          <Link href="/">
            <button className="btn btn-gold btn-lg">
              <Icon name="wand" size={18} /> Create your book — $99
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}
