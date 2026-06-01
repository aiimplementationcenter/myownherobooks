'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import { STYLES } from '@/lib/constants'

function BeforeAfter({ activeStyle }: { activeStyle: string }) {
  const [split, setSplit] = useState(52)
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef(false)
  const move = useCallback((clientX: number) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setSplit(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)))
  }, [])
  useEffect(() => {
    const mm = (e: MouseEvent | TouchEvent) => {
      if (!drag.current) return
      move('touches' in e ? e.touches[0].clientX : e.clientX)
    }
    const mu = () => { drag.current = false }
    window.addEventListener('mousemove', mm)
    window.addEventListener('mouseup', mu)
    window.addEventListener('touchmove', mm as EventListener, { passive: true })
    window.addEventListener('touchend', mu)
    return () => {
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('mouseup', mu)
      window.removeEventListener('touchmove', mm as EventListener)
      window.removeEventListener('touchend', mu)
    }
  }, [move])

  const active = STYLES.find((s) => s.id === activeStyle)

  return (
    <div className="baf-card reveal">
      <div className="baf-slider" ref={ref}
        onMouseDown={(e) => { drag.current = true; move(e.clientX) }}
        onTouchStart={(e) => { drag.current = true; move(e.touches[0].clientX) }}>
        <Image src="/assets/before.png" alt="Real photo of a child" fill style={{ objectFit: 'contain', filter: 'saturate(1.05)' }} />
        {STYLES.map((s) => (
          <Image key={s.id} src={s.img} alt={`${s.name} illustration`} fill
            className="baf-after"
            style={{ '--split': `${split}%`, opacity: activeStyle === s.id ? 1 : 0 } as React.CSSProperties}
          />
        ))}
        <span className="baf-tag l">Their photo</span>
        <span className="baf-tag r">{active?.name}</span>
        <div className="baf-line" style={{ '--split': `${split}%` } as React.CSSProperties} />
        <div className="baf-handle" style={{ '--split': `${split}%` } as React.CSSProperties}>
          <Icon name="arrow" size={20} />
        </div>
      </div>
    </div>
  )
}

export default function StyleGallery() {
  const [active, setActive] = useState('anime')
  return (
    <section className="section styles-sec" id="styles">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Choose their look</div>
          <h2>One photo. <span className="h-red">Endless</span> ways to shine.</h2>
          <p className="lede">Tap a style below, then drag the slider to watch a real photo become their hero.</p>
        </div>
        <div className="baf-stage"><BeforeAfter activeStyle={active} /></div>
        <div className="style-tiles">
          {STYLES.map((s) => (
            <button className={`style-tile${active === s.id ? ' sel' : ''}`} key={s.id} onClick={() => setActive(s.id)}>
              <div className="style-emoji" style={{ background: s.bg }}>{s.emoji}</div>
              <b>{s.name}</b><small>{s.desc}</small>
              <span className="st-tick"><Icon name="check" size={13} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
