'use client'
import { useRef, useEffect, useState } from 'react'
import Btn from '@/components/ui/Btn'
import Icon from '@/components/ui/Icon'
import { burst } from '@/lib/burst'
import type { WizardData } from './OrderWizard'

export default function Success({ data, onClose, orderNumber }: { data: WizardData; onClose: () => void; orderNumber?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [order] = useState(() => orderNumber ?? 'MOH-' + Math.floor(100000 + Math.random() * 899999))
  const name = data.name.trim() || 'your little hero'
  useEffect(() => {
    const t = setTimeout(() => burst(host.current, 80), 250)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="wz-success" ref={host}>
      <div className="succ-check"><Icon name="check" size={56} stroke={3} /></div>
      <h2>{name}&apos;s adventure has begun! ✨</h2>
      <p>Our illustrators are on it. We&apos;ll email a preview for you to approve within 2 days.</p>
      <div className="succ-order"><span className="k">Order number</span><span className="v">{order}</span></div>
      <div style={{ marginTop: 30 }}><Btn variant="gold" size="lg" icon="heart" onClick={onClose}>Back to home</Btn></div>
    </div>
  )
}
