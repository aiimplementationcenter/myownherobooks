'use client'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import Btn from '@/components/ui/Btn'
import { burst } from '@/lib/burst'

function SuccessContent() {
  const params = useSearchParams()
  const orderNumber = params.get('order') ?? ''
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => burst(host.current, 80), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="succ-page" ref={host}>
      <div className="succ-check"><Icon name="check" size={56} stroke={3} /></div>
      <h1>Your adventure has begun! ✨</h1>
      <p>Payment confirmed. Our illustrators are already at work on your personalized storybook.</p>
      {orderNumber && (
        <div className="succ-order">
          <span className="k">Order number</span>
          <span className="v">{orderNumber}</span>
        </div>
      )}
      <p style={{ marginTop: 16, color: '#6b7bad' }}>
        We&apos;ll email you a preview to approve within 2 business days.
      </p>
      <div style={{ marginTop: 32 }}>
        <Link href="/">
          <Btn variant="gold" size="lg" icon="heart">Back to home</Btn>
        </Link>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <div className="succ-page-wrap">
        <SuccessContent />
      </div>
    </Suspense>
  )
}
