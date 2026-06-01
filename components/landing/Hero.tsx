import Image from 'next/image'
import Btn from '@/components/ui/Btn'
import Icon from '@/components/ui/Icon'
import Stars from '@/components/ui/Stars'
import SparkleField from '@/components/ui/SparkleField'

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <header className="hero" id="top">
      <div className="hero-bg" />
      <SparkleField items={[
        { l: '6%', t: '18%', s: 30, d: 3.5 }, { l: '44%', t: '8%', s: 18, c: 's-sky', d: 4, delay: 0.5 },
        { r: '8%', t: '12%', s: 26, d: 3, delay: 1 }, { l: '2%', b: '22%', s: 20, c: 's-red', d: 3.8, delay: 0.3 },
        { r: '3%', b: '30%', s: 16, c: 's-sky', d: 3.2, delay: 0.8 }, { l: '30%', b: '6%', s: 22, d: 4.2, delay: 1.4 },
        { l: '52%', t: '30%', s: 14, k: 'star', d: 2.8, delay: 0.2 },
      ]} />
      <div className="wrap hero-grid">
        <div className="reveal in">
          <div className="pill" style={{ marginBottom: 22 }}>
            <Stars size={15} /> <span style={{ color: 'var(--navy)' }}>Loved by 12,000+ families</span>
          </div>
          <h1>
            <span className="ln">They imagine.</span>
            <span className="ln">We bring them <span className="h-red">to life.</span></span>
          </h1>
          <p className="hero-sub">A personalized storybook where your child is the hero — in their favorite illustration style, written for their exact reading level.</p>
          <div className="hero-cta">
            <Btn variant="gold" size="lg" icon="wand" onClick={onStart}>Create your book</Btn>
            <Btn variant="ghost" size="lg" icon="book" onClick={() => document.getElementById('samples')?.scrollIntoView()}>Peek inside</Btn>
          </div>
          <div className="hero-trust">
            <div className="avatars">
              {['#FFD45E','#F2818A','#7EC4EB','#9D8DF1','#6FCF97'].map((c, i) => (
                <span key={i} style={{ background: `radial-gradient(circle at 35% 30%, #fff6, ${c})` }} />
              ))}
            </div>
            <div className="trust-txt">4.9 / 5 average rating<small>From 3,400+ verified reviews</small></div>
          </div>
        </div>

        <div className="hero-art reveal in">
          <div className="hero-book float">
            <Image src="/assets/cover.png" alt="A personalized hero storybook cover" width={420} height={560} style={{ width: '100%', height: 'auto' }} />
            <div className="badge-30">
              <svg className="badge-burst" viewBox="0 0 100 100" aria-hidden="true">
                <path d="M50 1 L61 14 L78 7 L80 25 L98 28 L88 43 L99 56 L82 63 L86 81 L68 79 L60 96 L46 84 L29 93 L27 75 L9 73 L17 56 L3 44 L19 35 L14 17 L33 19 L41 3 L50 1 Z"/>
              </svg>
              <div className="badge-30-in"><b>30</b><span>PAGE<br/>BOOK</span></div>
            </div>
            <div className="hero-baf">
              <figure><Image src="/assets/before.png" alt="child photo" width={92} height={92} /><figcaption>Their photo</figcaption></figure>
              <span className="arrow"><Icon name="arrow" size={22} /></span>
              <figure><Image src="/assets/after.png" alt="illustrated hero" width={92} height={92} /><figcaption>Their hero</figcaption></figure>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
