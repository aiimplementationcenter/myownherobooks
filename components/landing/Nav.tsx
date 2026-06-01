'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Btn from '@/components/ui/Btn'

export default function Nav({ onStart }: { onStart: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top"><Image className="nav-logo" src="/assets/logo.png" alt="My Own Hero Books" width={300} height={112} style={{ height: 112, width: 'auto' }} /></a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#styles">Styles</a>
          <a href="#samples">Inside the book</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <Btn className="nav-cta" variant="gold" size="sm" icon="wand" onClick={onStart}>Create your book</Btn>
      </div>
    </nav>
  )
}
