'use client'
import { useState } from 'react'
import Icon from '@/components/ui/Icon'

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`}>
      <button className="faq-q" onClick={onToggle}>
        {q}<span className="pm"><Icon name="plus" size={18} /></span>
      </button>
      {isOpen && <div className="faq-a-inner">{a}</div>}
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const qs = [
    { q: 'What kind of photo works best?', a: 'A clear, well-lit photo where your child\'s face is easy to see — looking toward the camera is ideal. You can add up to 5 photos to bring siblings or family into the story too.' },
    { q: 'How long does it take to arrive?', a: 'We craft and review your book within 2 business days, then it ships and typically arrives within 7–14 days. You\'ll get a digital preview to approve before anything prints.' },
    { q: 'Can I really pick any illustration style?', a: 'Yes! Choose from Pixar-style 3D, anime, classic hand-drawn, watercolor, superhero comic, or claymation. Every page is illustrated to match your pick.' },
    { q: 'How do you match my child\'s reading level?', a: 'You tell us their age (3–10) and we tune vocabulary, sentence length and story complexity to four reading tiers — so the book grows with them and never frustrates.' },
    { q: 'Will it actually look like my child?', a: 'We capture their likeness — hair, skin tone, smile and spirit — reimagined in your chosen style. You\'ll approve a preview before we print, and we\'ll revise until you love it.' },
    { q: "What if we don't love it?", a: "Then it's on us. We offer a 30-day happiness guarantee: we'll make it right or refund you in full." },
  ]
  return (
    <section className="section faq" id="faq">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Good questions</div>
          <h2>Everything you might <span className="h-sky">wonder</span></h2>
        </div>
        <div className="faq-list">
          {qs.map((x, i) => (
            <FAQItem key={i} q={x.q} a={x.a} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
