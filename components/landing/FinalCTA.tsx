import Btn from '@/components/ui/Btn'
import SparkleField from '@/components/ui/SparkleField'

export default function FinalCTA({ onStart }: { onStart: () => void }) {
  return (
    <section className="final">
      <div className="final-cloud" />
      <SparkleField items={[
        { l: '8%', t: '22%', s: 26, d: 3.2 }, { r: '10%', t: '26%', s: 20, k: 'star', d: 3.6, delay: 0.4 },
        { l: '18%', b: '20%', s: 18, d: 3, delay: 0.8 }, { r: '20%', b: '24%', s: 24, d: 3.8, delay: 0.2 },
      ]} />
      <div className="wrap">
        <h2>Their story is waiting to be written.</h2>
        <p>Upload a photo today and hold their adventure in your hands in 7–14 days.</p>
        <Btn variant="gold" size="lg" icon="wand" onClick={onStart}>Create your book — $119</Btn>
      </div>
    </section>
  )
}
