'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import Btn from '@/components/ui/Btn'
import SparkleField from '@/components/ui/SparkleField'
import StepCheckout from '@/components/wizard/StepCheckout'
import Success from '@/components/wizard/Success'
import { STYLES, THEMES, READING_TIERS, tierFor } from '@/lib/constants'
import type { WizardData, Photo } from '@/components/wizard/OrderWizard'

function genOrderNumber() {
  return 'MOH-B-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

const EMPTY_CHILD = (): WizardData => ({
  photos: [], style: null, name: '', themes: [], story: '', age: 6, email: '', coverType: 'hardcover',
})

const BUNDLE_STEPS = ['Child 1', 'Child 2', 'Review', 'Pay']

// Reusable child form panel
function ChildPanel({
  childNum, data, set,
}: { childNum: 1 | 2; data: WizardData; set: (p: Partial<WizardData>) => void }) {
  const [customTheme, setCustomTheme] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const color = childNum === 1 ? 'var(--red)' : 'var(--sky)'
  const label = childNum === 1 ? 'first' : 'second'

  const addPhotos = (list: FileList | null) => {
    if (!list) return
    const room = 5 - data.photos.length
    const incoming = Array.from(list).slice(0, room).map((f) => ({ url: URL.createObjectURL(f), name: f.name, file: f }))
    if (incoming.length) set({ photos: [...data.photos, ...incoming] })
  }
  const removePhoto = (i: number) => set({ photos: data.photos.filter((_, idx) => idx !== i) })
  const toggleTheme = (t: string) => {
    const has = data.themes.includes(t)
    set({ themes: has ? data.themes.filter((x) => x !== t) : [...data.themes, t] })
  }
  const addCustom = () => {
    const t = customTheme.trim()
    if (!t || data.themes.includes(t)) { setCustomTheme(''); return }
    set({ themes: [...data.themes, t] }); setCustomTheme('')
  }

  return (
    <div className="wz-panel">
      <div className="wz-h">
        <span className="eyebrow" style={{ color }}>Child {childNum}</span>
        <h2>Tell us about your <span style={{ color }}>{label} hero</span></h2>
        <p>Upload a photo, pick a style, and share a little about them.</p>
      </div>

      {/* Photo */}
      <div className="field">
        <label>Photo{data.photos.length === 0 ? '' : `s (${data.photos.length}/5)`}</label>
        {data.photos.length > 0 ? (
          <div className="photo-grid" style={{ marginTop: 8 }}>
            {data.photos.map((p, i) => (
              <div className="photo-tile" key={i}>
                <Image src={p.url} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
                <span className="photo-role">{i === 0 ? 'Main hero' : `Co-star ${i}`}</span>
                <button className="photo-rm" onClick={() => removePhoto(i)}><Icon name="close" size={14} /></button>
              </div>
            ))}
            {data.photos.length < 5 && (
              <button className="photo-add" onClick={() => fileRef.current?.click()}>
                <Icon name="plus" size={22} /><span>Add</span>
              </button>
            )}
          </div>
        ) : (
          <div className="drop" onClick={() => fileRef.current?.click()} style={{ marginTop: 8 }}>
            <div className="di"><Icon name="upload" size={32} /></div>
            <h3>Upload photo</h3>
            <p>JPG or PNG, up to 5 photos</p>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => addPhotos(e.target.files)} />
      </div>

      {/* Name */}
      <div className="field">
        <label>Child&apos;s first name</label>
        <input className="inp" placeholder="e.g. Mason" value={data.name} maxLength={20} onChange={(e) => set({ name: e.target.value })} />
      </div>

      {/* Style */}
      <div className="field">
        <label>Illustration style</label>
        <div className="style-pick-mini">
          {STYLES.map((s) => (
            <button key={s.id} className={`spm-btn${data.style === s.id ? ' on' : ''}`} onClick={() => set({ style: s.id })}>
              <span>{s.emoji}</span><span>{s.name}</span>
              {data.style === s.id && <Icon name="check" size={12} className="spm-check" />}
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="field">
        <label>Age: <strong>{data.age}</strong> — {tierFor(data.age).l}</label>
        <input type="range" min={3} max={10} value={data.age}
          className="age-slider"
          style={{ '--pct': `${((data.age - 3) / 7) * 100}%` } as React.CSSProperties}
          onChange={(e) => set({ age: Number(e.target.value) })} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9aa3c8', fontWeight: 700, marginTop: 4 }}>
          <span>Age 3</span><span>Age 10</span>
        </div>
      </div>

      {/* Themes */}
      <div className="field">
        <label>Themes <span className="hint">(optional)</span></label>
        <div className="chips">
          {THEMES.map((t) => (
            <button key={t} className={`chip-pick${data.themes.includes(t) ? ' on' : ''}`} onClick={() => toggleTheme(t)}>
              {data.themes.includes(t) && <Icon name="check" size={13} />}{t}
            </button>
          ))}
          {data.themes.filter((t) => !THEMES.includes(t as typeof THEMES[number])).map((t) => (
            <button key={t} className="chip-pick on" onClick={() => toggleTheme(t)}>
              <Icon name="check" size={13} />{t}
            </button>
          ))}
        </div>
        <div className="custom-theme-row">
          <input className="inp custom-theme-inp" placeholder="Your own theme…" value={customTheme} maxLength={40}
            onChange={(e) => setCustomTheme(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())} />
          <button className="custom-theme-add" onClick={addCustom} disabled={!customTheme.trim()}>
            <Icon name="plus" size={16} />Add
          </button>
        </div>
      </div>

      {/* Story notes */}
      <div className="field">
        <label>Story notes <span className="hint">(optional)</span></label>
        <textarea className="ta" maxLength={400} rows={3}
          placeholder={`e.g. ${data.name || 'Mason'} loves dinosaurs and wants to be a firefighter…`}
          value={data.story} onChange={(e) => set({ story: e.target.value })} />
        <div className="charc">{data.story.length}/400</div>
      </div>

      {/* Cover type */}
      <div className="field">
        <label>Cover type</label>
        <div className="cover-pick">
          {[{ id: 'hardcover' as const, emoji: '📗', label: 'Hardcover', desc: 'Durable, built to last' },
            { id: 'softcover' as const, emoji: '📄', label: 'Softcover', desc: 'Lightweight & flexible' }].map((opt) => (
            <button key={opt.id} type="button" className={`cover-opt${data.coverType === opt.id ? ' on' : ''}`}
              onClick={() => set({ coverType: opt.id })}>
              <span className="cover-check">{data.coverType === opt.id ? <Icon name="check" size={13} /> : null}</span>
              <span className="cover-emoji">{opt.emoji}</span>
              <div><div className="cover-label">{opt.label}</div><div className="cover-desc">{opt.desc}</div></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Review panel for both children
function BundleReview({ c1, c2, setC1, setC2, goTo }: {
  c1: WizardData; c2: WizardData;
  setC1: (p: Partial<WizardData>) => void; setC2: (p: Partial<WizardData>) => void;
  goTo: (i: number) => void
}) {
  const s1 = STYLES.find((s) => s.id === c1.style)
  const s2 = STYLES.find((s) => s.id === c2.style)
  return (
    <div className="wz-panel">
      <div className="wz-h">
        <span className="eyebrow">Step 3</span>
        <h2>Almost there — <span className="h-gold">review your bundle</span></h2>
        <p>Two books, two adventures. Check everything looks right.</p>
      </div>

      {[{ label: 'Child 1', data: c1, color: 'var(--red)', goToStep: 0 },
        { label: 'Child 2', data: c2, color: 'var(--sky)', goToStep: 1 }].map(({ label, data, color, goToStep }) => {
        const style = label === 'Child 1' ? s1 : s2
        const tier = tierFor(data.age)
        return (
          <div key={label} className="bundle-rev-child">
            <div className="bundle-rev-hd" style={{ borderColor: color }}>
              <span style={{ color, fontWeight: 800 }}>{label}</span>
              <span className="rev-edit" onClick={() => goTo(goToStep)}>Edit</span>
            </div>
            <div className="rev-card" style={{ marginTop: 0, borderRadius: '0 0 16px 16px' }}>
              <div className="rev-row">
                {data.photos[0]
                  ? <Image src={data.photos[0].url} alt="" width={40} height={40} style={{ borderRadius: 10, objectFit: 'cover' }} unoptimized />
                  : <span className="ri"><Icon name="camera" size={20} /></span>}
                <div><div className="rk">Photos</div><div className="rv">{data.photos.length} uploaded</div></div>
              </div>
              <div className="rev-row">
                <span className="ri"><Icon name="user" size={20} /></span>
                <div><div className="rk">Name</div><div className="rv">{data.name || '—'}</div></div>
              </div>
              <div className="rev-row">
                <span className="em">{style?.emoji ?? '🎨'}</span>
                <div><div className="rk">Style</div><div className="rv">{style?.name ?? '—'}</div></div>
              </div>
              <div className="rev-row">
                <span className="ri"><Icon name="book" size={20} /></span>
                <div><div className="rk">Age / Level</div><div className="rv">{data.age} yrs · {tier.l}</div></div>
              </div>
              <div className="rev-row">
                <span style={{ fontSize: 18 }}>{data.coverType === 'hardcover' ? '📗' : '📄'}</span>
                <div><div className="rk">Cover</div><div className="rv" style={{ textTransform: 'capitalize' }}>{data.coverType}</div></div>
              </div>
            </div>
          </div>
        )
      })}

      <div className="rev-total" style={{ marginTop: 24 }}>
        <span className="rt-k">Bundle total</span>
        <div style={{ textAlign: 'right' }}>
          <span className="rt-v"><small>$158</small>$138</span>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--red)', marginTop: 2 }}>You save $20!</div>
        </div>
      </div>
    </div>
  )
}

export default function BundleWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [c1, setC1Raw] = useState<WizardData>(EMPTY_CHILD)
  const [c2, setC2Raw] = useState<WizardData>(EMPTY_CHILD)
  const [email, setEmail] = useState('')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [preparing, setPreparing] = useState(false)
  const [prepError, setPrepError] = useState<string | null>(null)
  const [orderNumber] = useState(genOrderNumber)
  const top = useRef<HTMLDivElement>(null)

  const setC1 = (p: Partial<WizardData>) => setC1Raw((d) => ({ ...d, ...p }))
  const setC2 = (p: Partial<WizardData>) => setC2Raw((d) => ({ ...d, ...p }))

  useEffect(() => { top.current?.scrollTo({ top: 0, behavior: 'smooth' }) }, [step, done])

  const canNext = [
    c1.photos.length > 0 && !!c1.style && c1.name.trim().length > 0,
    c2.photos.length > 0 && !!c2.style && c2.name.trim().length > 0,
    true,
  ]

  const prepareCheckout = async () => {
    setPreparing(true); setPrepError(null)
    try {
      let photoUrls1: string[] = c1.photos.map((p) => p.name)
      let photoUrls2: string[] = c2.photos.map((p) => p.name)
      if (process.env.NEXT_PUBLIC_BLOB_ENABLED === 'true') {
        const uploadChild = async (photos: Photo[], childLabel: string) => {
          const fd = new FormData()
          fd.append('orderNumber', orderNumber + '-' + childLabel)
          photos.forEach((p) => { if (p.file) fd.append('photos', p.file) })
          const res = await fetch('/api/upload-photos', { method: 'POST', body: fd })
          const data = await res.json()
          return res.ok ? data.urls as string[] : photos.map((p) => p.name)
        }
        ;[photoUrls1, photoUrls2] = await Promise.all([
          uploadChild(c1.photos, 'child1'),
          uploadChild(c2.photos, 'child2'),
        ])
      }
      const piRes = await fetch('/api/create-bundle-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, email, child1: c1, child2: c2, photoUrls1, photoUrls2 }),
      })
      const piData = await piRes.json()
      if (!piRes.ok) throw new Error(piData.error ?? 'Could not create payment')
      setClientSecret(piData.clientSecret)
      setStep(3)
    } catch (err: unknown) {
      setPrepError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally { setPreparing(false) }
  }

  const next = () => { if (step < 2) setStep(step + 1); else prepareCheckout() }
  const back = () => { if (step > 0) setStep(step - 1) }

  const isCheckout = step === 3
  const isReview = step === 2

  // Merge both children's data for Success screen
  const mergedData: WizardData = { ...c1, name: `${c1.name} & ${c2.name}` }

  return (
    <div className="wz-overlay" ref={top}>
      <div className="wz-bg" />
      <SparkleField items={[
        { l: '5%', t: '30%', s: 18, d: 3.4 }, { r: '6%', t: '24%', s: 20, c: 's-sky', d: 3 },
        { l: '9%', b: '20%', s: 16, c: 's-red', d: 3.6, delay: 0.5 }, { r: '8%', b: '26%', s: 22, d: 3.2, delay: 0.8 },
      ]} />

      <div className="wz-top">
        <div className="wz-top-inner">
          <Image src="/assets/logo.png" alt="My Own Hero Books" width={200} height={84} style={{ height: 84, width: 'auto' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="bundle-badge-sm">Sibling Bundle</span>
            <button className="wz-close" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
          </div>
        </div>
        {!done && (
          <div className="wz-steps">
            {BUNDLE_STEPS.map((l, i) => (
              <div className={`wz-step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`} key={l}>
                <span className="dot" onClick={() => i < step && i < 3 && setStep(i)}>
                  {i < step ? <Icon name="check" size={16} /> : i + 1}
                </span>
                <span className="lbl">{l}</span>
                {i < BUNDLE_STEPS.length - 1 && <span className="bar"><i /></span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="wz-body">
        {done ? (
          <Success data={mergedData} onClose={onClose} orderNumber={orderNumber} />
        ) : isCheckout && clientSecret ? (
          <StepCheckout clientSecret={clientSecret} orderNumber={orderNumber} email={email} setEmail={setEmail} onSuccess={() => setDone(true)} />
        ) : isReview ? (
          <BundleReview c1={c1} c2={c2} setC1={setC1} setC2={setC2} goTo={setStep} />
        ) : step === 0 ? (
          <ChildPanel childNum={1} data={c1} set={setC1} />
        ) : (
          <ChildPanel childNum={2} data={c2} set={setC2} />
        )}
      </div>

      {!done && !isCheckout && (
        <div className="wz-nav">
          <div className="wz-nav-inner">
            {step > 0
              ? <button className="wz-back" onClick={back}><Icon name="chevron" size={18} style={{ transform: 'rotate(180deg)' }} /> Back</button>
              : <span className="wz-secure"><Icon name="shield" size={16} /> Secure &amp; private</span>}
            <span className="grow" />
            {prepError && <span className="wz-prep-error"><Icon name="close" size={14} />{prepError}</span>}
            <Btn
              variant={isReview ? 'red' : 'gold'} size="lg"
              icon={isReview ? 'wand' : undefined}
              iconRight={isReview ? undefined : 'arrow'}
              disabled={step < 2 ? !canNext[step] : preparing}
              style={(step < 2 ? !canNext[step] : preparing) ? { opacity: 0.45, cursor: 'not-allowed', filter: 'grayscale(.3)' } : {}}
              onClick={() => (step < 2 ? canNext[step] : !preparing) && next()}>
              {preparing ? 'Preparing…' : isReview ? 'Continue to payment — $138' : 'Continue'}
            </Btn>
          </div>
        </div>
      )}
    </div>
  )
}
