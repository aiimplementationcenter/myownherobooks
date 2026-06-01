import Image from 'next/image'
import Icon from '@/components/ui/Icon'

export default function Samples() {
  const list = [
    'Your child illustrated on every single spread',
    'A heartfelt story with friends, courage & wonder',
    'Their name woven through all 30 pages',
    'Printed on thick, glossy keepsake paper',
  ]
  return (
    <section className="section samples" id="samples">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Inside the book</div>
          <h2>A real adventure, <span className="h-sky">starring them</span></h2>
        </div>
        <div className="sample-grid">
          <div className="sample-spread reveal">
            <Image src="/assets/spread.png" alt="Open storybook spread" width={760} height={400} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className="sample-copy reveal">
            <h3>Every page is unmistakably <span className="h-red">theirs</span>.</h3>
            <p className="lede">We don&apos;t just paste a face onto a template. Your child becomes the hero of an original tale — exploring, making friends, and saving the day.</p>
            <div className="sample-list">
              {list.map((t, i) => (
                <div className="sample-li" key={i}><span className="ck"><Icon name="check" size={16} /></span>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
