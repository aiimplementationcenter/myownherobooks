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
import Success from './Success'

export interface Photo { url: string; name: string }
export interface WizardData {
  photos: Photo[]
  style: string | null
  name: string
  themes: string[]
  story: string
  age: number
}

export default function OrderWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [data, setData] = useState<WizardData>({ photos: [], style: null, name: '', themes: [], story: '', age: 6 })
  const set = (patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch }))

  const canNext = [
    data.photos.length > 0,
    !!data.style,
    data.name.trim().length > 0,
    true,
    true,
  ]
  const top = useRef<HTMLDivElement>(null)
  useEffect(() => { top.current?.scrollTo({ top: 0, behavior: 'smooth' }) }, [step, done])

  const next = () => { if (step < 4) setStep(step + 1); else setDone(true) }
  const back = () => { if (step > 0) setStep(step - 1) }
  const goTo = (i: number) => setStep(i)

  const Panels = [StepPhoto, StepStyle, StepStory, StepReader, StepReview] as const
  const Panel = Panels[step]

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
                <span className="dot" onClick={() => i < step && goTo(i)}>
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
        {done ? <Success data={data} onClose={onClose} /> : <Panel data={data} set={set} goTo={goTo} />}
      </div>

      {!done && (
        <div className="wz-nav">
          <div className="wz-nav-inner">
            {step > 0
              ? <button className="wz-back" onClick={back}><Icon name="chevron" size={18} style={{ transform: 'rotate(180deg)' }} /> Back</button>
              : <span className="wz-secure"><Icon name="shield" size={16} /> Secure &amp; private</span>}
            <span className="grow" />
            <Btn
              variant={step === 4 ? 'red' : 'gold'} size="lg"
              icon={step === 4 ? 'wand' : undefined}
              iconRight={step === 4 ? undefined : 'arrow'}
              disabled={!canNext[step]}
              style={!canNext[step] ? { opacity: 0.45, cursor: 'not-allowed', filter: 'grayscale(.3)' } : {}}
              onClick={() => canNext[step] && next()}>
              {step === 4 ? 'Create my book — $79' : 'Continue'}
            </Btn>
          </div>
        </div>
      )}
    </div>
  )
}
