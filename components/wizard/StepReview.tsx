'use client'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import { STYLES, tierFor } from '@/lib/constants'
import type { WizardData } from './OrderWizard'

export default function StepReview({ data, goTo }: { data: WizardData; goTo: (i: number) => void }) {
  const style = STYLES.find((s) => s.id === data.style)
  const tier = tierFor(data.age)
  return (
    <div className="wz-panel">
      <div className="wz-h">
        <span className="eyebrow">Step 5</span>
        <h2>Ready to make <span className="h-gold">magic</span>?</h2>
        <p>Quick look before we hand it to our illustrators. You&apos;ll approve a preview before anything prints.</p>
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
        <span className="rt-v"><small>$149</small>$119</span>
      </div>
    </div>
  )
}
