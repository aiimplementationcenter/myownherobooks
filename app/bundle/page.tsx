'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import Btn from '@/components/ui/Btn'
import Footer from '@/components/landing/Footer'
import BundleWizard from '@/components/bundle/BundleWizard'

const TRUST = [
  { icon: 'shield', label: 'Safe & Secure Checkout' },
  { icon: 'star', label: 'Happiness Guaranteed' },
  { icon: 'gift', label: 'Free Worldwide Shipping' },
  { icon: 'book', label: '30-Page Keepsake Book' },
]

const HOW = [
  { n: '1', title: 'Tell Us About Each Hero', body: 'Upload a photo and share each child\'s name, age, favorite themes, and a little about their personality.' },
  { n: '2', title: 'We Write & Illustrate', body: 'Our team crafts two unique, personalized stories — each one tailored to its hero, illustrated in the style you choose.' },
  { n: '3', title: 'Preview & Approve', body: 'We send you a full preview of both books before anything goes to print. You love it, or we revise it.' },
  { n: '4', title: 'Delivered to Your Door', body: 'Both beautifully bound keepsake books arrive together, ready to gift or treasure.' },
]

const PERKS = [
  { emoji: '📸', title: 'Their Face in Every Spread', body: 'Real photo-based illustrations — not just a name swap.' },
  { emoji: '✍️', title: 'Two Unique Stories', body: 'Each book is written fresh for that child\'s age, interests, and personality.' },
  { emoji: '🎨', title: '6 Illustration Styles', body: 'Choose a different style for each child, or match them — it\'s up to you.' },
  { emoji: '📗', title: 'Hardcover or Softcover', body: 'Pick the format that fits each child best.' },
  { emoji: '🌍', title: 'Free Worldwide Shipping', body: 'Both books ship together at no extra cost, anywhere on the planet.' },
  { emoji: '💛', title: 'Love-It Guarantee', body: '30 days. If you\'re not thrilled, we make it right — no questions asked.' },
]

export default function BundlePage() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* NAV */}
      <nav className="nav scrolled" style={{ position: 'sticky', top: 0, zIndex: 200 }}>
        <div className="wrap nav-inner">
          <a href="/"><Image className="nav-logo" src="/assets/logo.png" alt="My Own Hero Books" width={300} height={112} style={{ height: 112, width: 'auto' }} /></a>
          <Btn variant="gold" size="sm" icon="wand" onClick={() => setOpen(true)}>Order Bundle — $138</Btn>
        </div>
      </nav>

      {/* HERO */}
      <section className="bndl-hero">
        <div className="bndl-hero-bg" />
        <div className="wrap bndl-hero-inner">
          <div className="bndl-badge-wrap">
            <span className="bndl-badge">🎉 Limited Bundle Deal</span>
          </div>
          <h1 className="bndl-h1">
            2 Kids. 2 Adventures.<br />
            <span className="bndl-h1-gold">Twice the Magic!</span>
          </h1>
          <p className="bndl-sub">
            Get two fully personalized, professionally illustrated storybooks — one for each of your little heroes — and save $19 when you order together.
          </p>
          <div className="bndl-price-row">
            <div className="bndl-price-card">
              <div className="bndl-pc-label">First book</div>
              <div className="bndl-pc-amt">$79</div>
            </div>
            <div className="bndl-plus">+</div>
            <div className="bndl-price-card bndl-price-card--sky">
              <div className="bndl-pc-label">Second book</div>
              <div className="bndl-pc-amt">$59</div>
            </div>
            <div className="bndl-equals">=</div>
            <div className="bndl-price-card bndl-price-card--gold">
              <div className="bndl-pc-label">Bundle total</div>
              <div className="bndl-pc-amt bndl-pc-big">$138</div>
              <div className="bndl-pc-save">You Save $19!</div>
            </div>
          </div>
          <Btn variant="gold" size="lg" icon="wand" onClick={() => setOpen(true)}>
            Create Both Books — $138
          </Btn>
          <p className="bndl-guar"><Icon name="shield" size={16} /> 30-day happiness guarantee &nbsp;·&nbsp; <Icon name="gift" size={16} /> Free worldwide shipping</p>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bndl-trust-bar">
        <div className="wrap bndl-trust-inner">
          {TRUST.map((t) => (
            <div key={t.label} className="bndl-trust-item">
              <Icon name={t.icon as 'shield' | 'star' | 'gift' | 'book'} size={22} />
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT YOU GET */}
      <section className="section bndl-perks">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">What&apos;s Included</div>
            <h2>Two books. <span className="h-gold">Zero corners cut.</span></h2>
            <p className="sec-sub">Each book in the bundle is the full premium experience — no shortcuts just because it&apos;s two.</p>
          </div>
          <div className="bndl-perks-grid">
            {PERKS.map((p) => (
              <div key={p.title} className="bndl-perk-card">
                <span className="bndl-perk-emoji">{p.emoji}</span>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bndl-how" style={{ background: 'var(--navy)' }}>
        <div className="wrap">
          <div className="sec-head" style={{ color: '#fff' }}>
            <div className="eyebrow" style={{ color: 'var(--gold)' }}>How It Works</div>
            <h2 style={{ color: '#fff' }}>Simple, magical, <span className="h-gold">personal.</span></h2>
          </div>
          <div className="bndl-how-grid">
            {HOW.map((h) => (
              <div key={h.n} className="bndl-how-card">
                <div className="bndl-how-num">{h.n}</div>
                <h4>{h.title}</h4>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="section bndl-compare">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Bundle vs. Separate</div>
            <h2>Better together — <span className="h-red">obviously.</span></h2>
          </div>
          <div className="bndl-compare-wrap">
            <div className="bndl-compare-col bndl-compare-sep">
              <div className="bndl-cc-head">Ordering Separately</div>
              <div className="bndl-cc-price">$79 + $79 = <strong>$158</strong></div>
              <ul className="bndl-cc-list">
                <li><Icon name="check" size={15} /> 2 personalized books</li>
                <li><Icon name="check" size={15} /> Free shipping on each</li>
              </ul>
            </div>
            <div className="bndl-compare-col bndl-compare-bundle">
              <div className="bndl-cc-ribbon">Best Value</div>
              <div className="bndl-cc-head">Sibling Bundle</div>
              <div className="bndl-cc-price">$79 + $59 = <strong>$138</strong></div>
              <ul className="bndl-cc-list">
                <li><Icon name="check" size={15} /> 2 personalized books</li>
                <li><Icon name="check" size={15} /> Free shipping — together</li>
                <li><Icon name="check" size={15} /> <strong>Save $19 instantly</strong></li>
                <li><Icon name="check" size={15} /> One easy checkout</li>
              </ul>
              <Btn variant="gold" size="lg" icon="wand" block onClick={() => setOpen(true)}>
                Order Bundle — $138
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section bndl-cta">
        <div className="wrap bndl-cta-inner">
          <div className="bndl-cta-stars">★★★★★</div>
          <h2>Ready to make two little heroes?</h2>
          <p>It takes just a few minutes to set up both books. We handle everything else.</p>
          <Btn variant="gold" size="lg" icon="wand" onClick={() => setOpen(true)}>
            Start the Sibling Bundle — $138
          </Btn>
          <p className="bndl-guar" style={{ marginTop: 16 }}>
            <Icon name="shield" size={16} /> 30-day love-it guarantee &nbsp;·&nbsp; <Icon name="gift" size={16} /> Free worldwide shipping
          </p>
        </div>
      </section>

      <Footer />

      {/* WIZARD MODAL */}
      {open && (
        <BundleWizard onClose={() => setOpen(false)} />
      )}
    </>
  )
}
