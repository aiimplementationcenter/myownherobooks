import Stars from '@/components/ui/Stars'

export default function Testimonials() {
  const q = [
    { c: '#FFD45E', n: 'Sarah M.', r: 'Mom of Leo, 6', t: "Leo gasped when he saw himself on the cover. He's asked to read it every single night for two weeks straight." },
    { c: '#F2818A', n: 'David & Priya', r: 'Parents of Anaya, 4', t: 'The anime style was perfect and the words were just right for her age. The quality of the book genuinely surprised us.' },
    { c: '#7EC4EB', n: 'Marcus T.', r: 'Dad of twins, 8', t: "Got one for each twin with different stories. Best birthday gift we've ever given — they treasure them." },
  ]
  return (
    <section className="section testi">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Loved by little heroes</div>
          <h2>The look on their face is <span className="h-red">everything</span></h2>
        </div>
        <div className="testi-grid">
          {q.map((x, i) => (
            <div className="quote reveal" style={{ transitionDelay: `${i * 0.08}s` }} key={i}>
              <span className="qm">&ldquo;</span>
              <Stars />
              <p>{x.t}</p>
              <div className="by">
                <span className="ava" style={{ background: `radial-gradient(circle at 35% 30%, #fff8, ${x.c})` }} />
                <span><b>{x.n}</b><small>{x.r}</small></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
