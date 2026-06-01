'use client'
import Icon from '@/components/ui/Icon'
import { STYLES } from '@/lib/constants'
import type { WizardData } from './OrderWizard'

export default function StepStyle({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  return (
    <div className="wz-panel">
      <div className="wz-h">
        <span className="eyebrow">Step 2</span>
        <h2>Pick their <span className="h-gold">illustration style</span></h2>
        <p>Every one of the 30 pages will be drawn in the look you choose.</p>
      </div>
      <div className="style-pick">
        {STYLES.map((s) => (
          <div key={s.id} className={`sp-card${data.style === s.id ? ' sel' : ''}`} onClick={() => set({ style: s.id })}>
            <span className="tick"><Icon name="check" size={15} /></span>
            <div className="em" style={{ background: s.bg }}>{s.emoji}</div>
            <b>{s.name}</b><small>{s.desc}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
