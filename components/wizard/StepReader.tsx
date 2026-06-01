'use client'
import Icon from '@/components/ui/Icon'
import { tierFor } from '@/lib/constants'
import type { WizardData } from './OrderWizard'

export default function StepReader({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  const tier = tierFor(data.age)
  const pct = ((data.age - 3) / (10 - 3)) * 100
  const name = data.name.trim() || 'your child'
  return (
    <div className="wz-panel">
      <div className="wz-h">
        <span className="eyebrow">Step 4</span>
        <h2>How old is <span className="h-red">{name}</span>?</h2>
        <p>We&apos;ll tune every word to their reading level so the book always feels just right.</p>
      </div>
      <div className="age-big">
        <div className="age-num">{data.age} <span>{data.age === 1 ? 'year' : 'years'} old</span></div>
        <input className="age-slider" type="range" min="3" max="10" step="1" value={data.age}
          style={{ '--pct': `${pct}%` } as React.CSSProperties}
          onChange={(e) => set({ age: +e.target.value })} />
        <div className="age-ticks">{[3,4,5,6,7,8,9,10].map((n) => <span key={n}>{n}</span>)}</div>
      </div>
      <div className="lvl-card">
        <span className="tag"><Icon name="book" size={15} /> {tier.l}</span>
        <h3>Reading level: {tier.l}</h3>
        <p>{tier.p}</p>
        <div className="demo">A page might read: {tier.demo.replace('Max', name === 'your child' ? 'they' : name)}</div>
      </div>
    </div>
  )
}
