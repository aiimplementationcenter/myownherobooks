import SparkleField from '@/components/ui/SparkleField'

export default function Reading() {
  const tiers = [
    { a: 'Ages 3–4', l: 'First Words', p: 'Short, rhythmic lines and big friendly words for cuddle-up read-alouds.', demo: '“Max put on his cape. Whoosh! Off he flew!”', ds: 18 },
    { a: 'Ages 5–6', l: 'Early Reader', p: 'Simple sentences and gentle repetition to build budding confidence.', demo: '“Max found a glowing map. Where would it lead him today?”', ds: 16.5 },
    { a: 'Ages 7–8', l: 'Growing Reader', p: 'Richer vocabulary and a real story arc with a problem to solve.', demo: '“The bridge had vanished, but Max remembered what his friend taught him.”', ds: 15.5 },
    { a: 'Ages 9–10', l: 'Confident Reader', p: 'Chapter-style pacing, vivid description and a satisfying twist.', demo: '“Beyond the misty ridge, an ancient secret waited — and only Max could unlock it.”', ds: 15 },
  ]
  return (
    <section className="section reading">
      <SparkleField items={[
        { l: '5%', t: '16%', s: 22, d: 3.4 }, { r: '8%', t: '20%', s: 16, c: 's-sky', d: 3 },
        { l: '12%', b: '12%', s: 18, k: 'star', d: 3.8, delay: 0.6 }, { r: '14%', b: '18%', s: 20, d: 3.2, delay: 1 },
      ]} />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="sec-head reveal">
          <div className="eyebrow" style={{ color: 'var(--gold-light)' }}>Made for their reading level</div>
          <h2>The right words for <span className="h-gold">right now</span></h2>
          <p className="lede" style={{ color: '#b8c2ec' }}>Tell us their age and we tune the vocabulary, sentence length and story complexity — so reading always feels like a win.</p>
        </div>
        <div className="age-track">
          {tiers.map((t, i) => (
            <div className="age-card reveal" style={{ transitionDelay: `${i * 0.07}s` }} key={i}>
              <div className="ages">{t.a}</div>
              <div className="lvl">{t.l}</div>
              <p>{t.p}</p>
              <div className="demo" style={{ fontSize: t.ds }}>{t.demo}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
