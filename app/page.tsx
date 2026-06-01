'use client'
import { useState, useEffect } from 'react'
import { useReveal } from '@/lib/hooks'
import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import TrustBar from '@/components/landing/TrustBar'
import HowItWorks from '@/components/landing/HowItWorks'
import StyleGallery from '@/components/landing/StyleGallery'
import Samples from '@/components/landing/Samples'
import Reading from '@/components/landing/Reading'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'
import Btn from '@/components/ui/Btn'
import OrderWizard from '@/components/wizard/OrderWizard'

function RevealObserver() {
  useReveal()
  return null
}

export default function Home() {
  const [ordering, setOrdering] = useState(false)
  const start = () => setOrdering(true)

  useEffect(() => {
    document.body.style.overflow = ordering ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [ordering])

  return (
    <>
      <RevealObserver />
      <Nav onStart={start} />
      <Hero onStart={start} />
      <TrustBar />
      <HowItWorks onStart={start} />
      <StyleGallery />
      <Samples />
      <Reading />
      <Testimonials />
      <Pricing onStart={start} />
      <FAQ />
      <FinalCTA onStart={start} />
      <Footer />
      <div className="sticky-cta">
        <Btn variant="gold" block size="lg" icon="wand" onClick={start}>Create your book — $119</Btn>
      </div>
      {ordering && <OrderWizard onClose={() => setOrdering(false)} />}
    </>
  )
}
