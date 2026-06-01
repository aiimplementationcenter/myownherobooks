'use client'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import { STYLES, tierFor } from '@/lib/constants'
import type { WizardData } from './OrderWizard'

const COVER_OPTIONS = [
  { id: 'hardcover' as const, label: 'Hardcover', desc: 'Durable rigid cover — built to last a lifetime', emoji: '📗' },
  { id: 'softcover' as const, label: 'Softcover', desc: 'Lightweight & flexible — easy to carry anywhere', emoji: '📄' },
]

export default function StepReview({ data, set, goTo }: { data: WizardData; set: (p: Partial<WizardData>) => void; goTo: (i: number) => void }) {
  const style = STYLES.find((s) => s.id === data.style)
  const tier = tierFor(data.age)
  return (
    <div className="wz-panel">
      <div className="wz-h">
        <span className="eyebrow">Step 5</span>
        <h2>Ready to make <span className="h-gold">magic</span>?</h2>
        <p>Quick look before we hand it to our illustrators. You&apos;ll approve a preview before anything prints.</p>
      </div>

      {/* Cover type picker */}
      <div className="field" style={{ marginBottom: 24 }}>
        <label>Choose your cover type</label>
        <div className="cover-pick">
          {COVER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`cover-opt${data.coverType === opt.id ? ' on' : ''}`}
              onClick={() => set({ coverType: opt.id })}
            >
              <span className="cover-check">{data.coverType === opt.id ? <Icon name="check" size={14} /> : null}</span>
              <span className="cover-emoji">{opt.emoji}</span>
              <div>
                <div className="cover-label">{opt.label}</div>
                <div className="cover-desc">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rev-card">
        <div className="rev-row">
          {data.photos.length ? <Image src={data.photos[0].url} alt="" width={46} height={46} style={{ borderRadius: 14, objectFit: 'cover' }} unoptimized /> : <span className="ri"><Icon name="camera" size={22} /></span>}
          <div><div className="rk">Hero photos</div><div className="rv">{data.photos.length ? `${data.photos.length} photo${data.photos.length > 1 ? 's' : ''} uploaded ✓` : '—'}</div></div>
          <span className="rev-edit" onClick={() => goTo(0)}>Edit</span>
        </div>
        <div className="rev-row">
          <span className="em">{style?.emoji ?? '🎨'}</span>
          <div><div className="rk">Illustration style</div><div className="rv">{style?.name ?? '—'}</div></div>
          <span className="rev-edit" onClick={() => goTo(1)}>Edit</span>
        </div>
        <div className="rev-row">
          <span className="ri"><Icon name="user" size={22} /></span>
          <div><div className="rk">Hero name</div><div className="rv">{data.name.trim() || '—'}</div></div>
          <span className="rev-edit" onClick={() => goTo(2)}>Edit</span>
        </div>
        <div className="rev-row">
          <span className="ri"><Icon name="book" size={22} /></span>
          <div><div className="rk">Age &amp; reading level</div><div className="rv">{data.age} yrs · {tier.l}</div></div>
          <span className="rev-edit" onClick={() => goTo(3)}>Edit</span>
        </div>
        <div className="rev-row">
          <span className="ri" style={{ fontSize: 20 }}>{data.coverType === 'hardcover' ? '📗' : '📄'}</span>
          <div><div className="rk">Cover type</div><div className="rv" style={{ textTransform: 'capitalize' }}>{data.coverType}</div></div>
          <span className="rev-edit" onClick={() => set({ coverType: data.coverType === 'hardcover' ? 'softcover' : 'hardcover' })}>Change</span>
        </div>
        {(data.themes.length > 0 || data.story.trim()) && (
          <div className="rev-row">
            <span className="ri"><Icon name="pen" size={20} /></span>
            <div style={{ minWidth: 0 }}>
              <div className="rk">Story</div>
              <div className="rv" style={{ fontSize: 15, fontWeight: 700, whiteSpace: 'normal', lineHeight: 1.4 }}>
                {data.themes.join(', ')}{data.themes.length && data.story.trim() ? ' — ' : ''}{data.story.trim() || (data.themes.length ? '' : "We'll craft a perfect surprise!")}
              </div>
            </div>
            <span className="rev-edit" onClick={() => goTo(2)}>Edit</span>
          </div>
        )}
      </div>
      <div className="rev-total">
        <span className="rt-k">Your book</span>
        <span className="rt-v"><small>$149</small>$99</span>
      </div>
    </div>
  )
}
