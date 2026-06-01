'use client'
import Icon from '@/components/ui/Icon'
import { THEMES } from '@/lib/constants'
import type { WizardData } from './OrderWizard'

export default function StepStory({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  const toggle = (t: string) => {
    const has = data.themes.includes(t)
    set({ themes: has ? data.themes.filter((x) => x !== t) : [...data.themes, t] })
  }
  return (
    <div className="wz-panel">
      <div className="wz-h">
        <span className="eyebrow">Step 3</span>
        <h2>What&apos;s their <span className="h-sky">adventure</span>?</h2>
        <p>A name and a sentence or two is all our story-writers need.</p>
      </div>
      <div className="field">
        <label>Child&apos;s first name</label>
        <input className="inp" placeholder="e.g. Max" value={data.name} maxLength={20} onChange={(e) => set({ name: e.target.value })} />
      </div>
      <div className="field">
        <label>Pick a theme or two <span className="hint">(optional)</span></label>
        <div className="chips">
          {THEMES.map((t) => (
            <button key={t} className={`chip-pick${data.themes.includes(t) ? ' on' : ''}`} onClick={() => toggle(t)}>
              {data.themes.includes(t) && <Icon name="check" size={14} />}{t}
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Tell us about the story</label>
        <textarea className="ta" maxLength={400}
          placeholder="e.g. Max loves dinosaurs and being brave. I'd love a story where he explores a jungle, makes a new dino friend, and learns that being kind makes him the strongest hero of all."
          value={data.story} onChange={(e) => set({ story: e.target.value })} />
        <div className="charc">{data.story.length}/400</div>
      </div>
    </div>
  )
}
