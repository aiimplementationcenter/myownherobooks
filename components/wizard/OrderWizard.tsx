'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Btn from '@/components/ui/Btn'
import Icon from '@/components/ui/Icon'
import SparkleField from '@/components/ui/SparkleField'
import { STEP_LABELS } from '@/lib/constants'
import StepPhoto from './StepPhoto'
import StepStyle from './StepStyle'
import StepStory from './StepStory'
import StepReader from './StepReader'
import StepReview from './StepReview'
import StepCheckout from './StepCheckout'
import Success from './Success'

export interface Photo { url: string; name: string; file?: File }
export interface WizardData {
  photos: Photo[]
  style: string | null
  name: string
  themes: string[]
  story: string
  age: number
  email: string
}

function genOrderNumber() {
  return 'MOH-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

export default function OrderWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [data, setData] = useState<WizardData>({
    photos: [], style: null, name: '', themes: [], story: '', age: 6, email: '',
  })
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderNumber] = useState(genOrderNumber)
  const [preparing, setPreparing] = useState(false)
  const [prepError, setPrepError] = useState<string | null>(null)

  const set = (patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch }))

  const canNext = [
    data.photos.length > 0,   // Step 0: Photo
    !!data.style,              // Step 1: Style
    data.name.trim().length > 0, // Step 2: Story
    true,                      // Step 3: Reader
    true,                      // Step 4: Review — "Continue" kicks off prepare flow
  ]

  const top = useRef<HTMLDivElement>(null)
  useEffect(() => { top.current?.scrollTo({ top: 0, behavior: 'smooth' }) }, [step, done])

  // Upload photos + create PaymentIntent when user clicks Continue on Review
  const prepareCheckout = async () => {
    setPreparing(true)
    setPrepError(null)
    try {
      // 1. Upload photos
      let photoUrls: string[] = []
      const filesExist = data.photos.some((p) => p.file)
      if (filesExist && process.env.NEXT_PUBLIC_BLOB_ENABLED === 'true') {
        const fd = new FormData()
        fd.append('orderNumber', orderNumber)
        data.photos.forEach((p) => { if (p.file) fd.append('photos', p.file) })
        const uploadRes = await fetch('/api/upload-photos', { method: 'POST', body: fd })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error ?? 'Photo upload failed')
        photoUrls = uploadData.urls
      } else {
        // Fallback: just note photos are attached (local blob: URLs can't be stored)
        photoUrls = data.photos.map((p) => p.name)
      }

      // 2. Create PaymentIntent
      const piRes = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          name: data.name,
          age: data.age,
          style: data.style,
          themes: data.themes,
          story: data.story,
          email: data.email,
          photoUrls,
        }),
      })
      const piData = await piRes.json()
      if (!piRes.ok) throw new Error(piData.error ?? 'Could not create payment')
      setClientSecret(piData.clientSecret)
      setStep(5)
    } catch (err: unknown) {
      setPrepError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setPreparing(false)
    }
  }

  const next = () => {
    if (step < 4) {
      setStep(step + 1)
    } else if (step === 4) {
      prepareCheckout()
    }
    // step 5 is handled by StepCheckout itself
  }
  const back = () => { if (step > 0) setStep(step - 1) }
  const goTo = (i: number) => setStep(i)

  const Panels = [StepPhoto, StepStyle, StepStory, StepReader, StepReview] as const
  const isCheckoutStep = step === 5
  const Panel = step < 5 ? Panels[step as 0 | 1 | 2 | 3 | 4] : null

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
          <button className="wz-close" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
        </div>
        {!done && (
          <div className="wz-steps">
            {STEP_LABELS.map((l, i) => (
              <div className={`wz-step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`} key={l}>
                <span className="dot" onClick={() => i < step && i < 5 && goTo(i)}>
                  {i < step ? <Icon name="check" size={16} /> : i + 1}
                </span>
                <span className="lbl">{l}</span>
                {i < STEP_LABELS.length - 1 && <span className="bar"><i /></span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="wz-body">
        {done ? (
          <Success data={data} onClose={onClose} orderNumber={orderNumber} />
        ) : isCheckoutStep && clientSecret ? (
          <StepCheckout
            clientSecret={clientSecret}
            orderNumber={orderNumber}
            email={data.email}
            setEmail={(v) => set({ email: v })}
            onSuccess={() => setDone(true)}
          />
        ) : Panel ? (
          <Panel data={data} set={set} goTo={goTo} />
        ) : null}
      </div>

      {!done && !isCheckoutStep && (
        <div className="wz-nav">
          <div className="wz-nav-inner">
            {step > 0
              ? <button className="wz-back" onClick={back}><Icon name="chevron" size={18} style={{ transform: 'rotate(180deg)' }} /> Back</button>
              : <span className="wz-secure"><Icon name="shield" size={16} /> Secure &amp; private</span>}
            <span className="grow" />
            {prepError && <span className="wz-prep-error"><Icon name="close" size={14} />{prepError}</span>}
            <Btn
              variant={step === 4 ? 'red' : 'gold'} size="lg"
              icon={step === 4 ? 'wand' : undefined}
              iconRight={step === 4 ? undefined : 'arrow'}
              disabled={!canNext[step] || preparing}
              style={(!canNext[step] || preparing) ? { opacity: 0.45, cursor: 'not-allowed', filter: 'grayscale(.3)' } : {}}
              onClick={() => canNext[step] && !preparing && next()}>
              {preparing ? 'Preparing…' : step === 4 ? 'Continue to payment' : 'Continue'}
            </Btn>
          </div>
        </div>
      )}
    </div>
  )
}
