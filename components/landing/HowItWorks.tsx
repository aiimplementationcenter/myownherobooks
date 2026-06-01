import Icon from '@/components/ui/Icon'
import Btn from '@/components/ui/Btn'

export default function HowItWorks({ onStart }: { onStart: () => void }) {
  const steps = [
    { i: 'camera' as const, t: 'Upload a photo', d: 'One clear photo of your child is all we need to begin the magic.' },
    { i: 'palette' as const, t: 'Pick a style', d: 'Pixar 3D, anime, watercolor, superhero & more — you choose the look.' },
    { i: 'pen' as const, t: 'Tell the story', d: 'A sentence or two about the adventure you\'d love them to star in.' },
    { i: 'book' as const, t: 'Set the reading level', d: 'Tell us their age and we tune every word to how they read.' },
  ]
  return (
    <section className="section how" id="how">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">How it works</div>
          <h2>Four little steps to a <span className="h-gold">one-of-a-kind</span> book</h2>
          <p className="lede">No design skills, no waiting around. Most parents finish in under three minutes.</p>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step reveal" style={{ transitionDelay: `${i * 0.08}s` }} key={i}>
              <div className="step-ico"><Icon name={s.i} size={36} /><span className="step-num">{i + 1}</span></div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="how-cta reveal">
          <Btn variant="red" size="lg" icon="wand" onClick={onStart}>Start their adventure</Btn>
        </div>
      </div>
    </section>
  )
}
