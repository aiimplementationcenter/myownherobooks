import Icon from '@/components/ui/Icon'
import Btn from '@/components/ui/Btn'

export default function Pricing({ onStart }: { onStart: () => void }) {
  const feats = [
    'Personalized 30-page hardcover or softcover book',
    'Your choice of 6 illustration styles',
    'Story written to their reading level',
    'Their name & photo on every spread',
    'Free worldwide shipping',
    'Love-it-or-money-back guarantee',
  ]
  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Simple pricing</div>
          <h2>One magical book, <span className="h-gold">one fair price</span></h2>
        </div>
        <div className="price-card reveal">
          <div className="price-top">
            <span className="ribbon">★ Bestselling gift</span>
            <div className="price-amt"><sup>$</sup>79<span className="was">$149</span></div>
            <p>Everything included — no surprises at checkout.</p>
          </div>
          <div className="price-body">
            <ul className="price-feats">
              {feats.map((f, i) => (
                <li key={i}><span className="ck"><Icon name="check" size={15} /></span>{f}</li>
              ))}
            </ul>
            <Btn variant="gold" size="lg" block icon="wand" onClick={onStart}>Create your book — $79</Btn>
            <div className="price-guar"><Icon name="shield" size={18} />30-day happiness guarantee</div>
          </div>
        </div>
      </div>
    </section>
  )
}
