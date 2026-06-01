'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import { SAMPLE_PHOTOS } from '@/lib/constants'
import type { WizardData } from './OrderWizard'

const MAX_PHOTOS = 5

export default function StepPhoto({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  const [over, setOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const photos = data.photos
  const room = MAX_PHOTOS - photos.length

  const addPhotos = (list: FileList | null) => {
    if (!list) return
    const incoming = Array.from(list).slice(0, room).map((f) => ({ url: URL.createObjectURL(f), name: f.name }))
    if (incoming.length) set({ photos: [...photos, ...incoming] })
  }
  const addSample = (s: string) => { if (room > 0) set({ photos: [...photos, { url: s, name: 'sample-photo.png' }] }) }
  const removeAt = (i: number) => set({ photos: photos.filter((_, idx) => idx !== i) })

  return (
    <div className="wz-panel">
      <div className="wz-h">
        <span className="eyebrow">Step 1</span>
        <h2>Add your <span className="h-red">cast</span> of heroes</h2>
        <p>Upload your child first, then add up to 4 siblings or family members to star alongside them.</p>
      </div>

      {photos.length > 0 && (
        <div className="photo-grid">
          {photos.map((p, i) => (
            <div className="photo-tile" key={i}>
              <Image src={p.url} alt={`photo ${i + 1}`} fill style={{ objectFit: 'cover' }} unoptimized />
              <span className="photo-role">{i === 0 ? 'Main hero' : `Co-star ${i}`}</span>
              <button className="photo-rm" onClick={() => removeAt(i)} aria-label="Remove photo"><Icon name="close" size={15} /></button>
            </div>
          ))}
          {room > 0 && (
            <button className="photo-add" onClick={() => fileRef.current?.click()}>
              <Icon name="plus" size={26} /><span>Add another</span>
            </button>
          )}
        </div>
      )}

      {photos.length === 0 && (
        <div className={`drop${over ? ' over' : ''}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setOver(true) }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); addPhotos(e.dataTransfer.files) }}>
          <div className="di"><Icon name="upload" size={38} /></div>
          <h3>Drag photos here</h3>
          <p>or tap to browse — JPG or PNG, up to 5 photos</p>
          <div className="or pill pill-soft">🔒 Private &amp; only used to make your book</div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => addPhotos(e.target.files)} />

      <div className="sample-row">
        <span style={{ fontWeight: 800, color: '#9aa3c8' }}>
          {room > 0 ? 'No photo handy? Try a sample:' : "That's the max of 5 — looking good!"}
        </span>
        {room > 0 && SAMPLE_PHOTOS.map((s) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s} className="sample-thumb" src={s} alt="sample" onClick={() => addSample(s)} />
        ))}
      </div>
    </div>
  )
}
