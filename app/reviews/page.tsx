import Link from 'next/link'
import type { Metadata } from 'next'
import Icon from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: 'Reviews — My Own Hero Books',
  description: 'See what families are saying about their personalized storybooks from My Own Hero Books.',
}

const REVIEWS = [
  {
    name: 'Sarah M.',
    role: 'Mom of Leo, age 6',
    color: '#FFD45E',
    stars: 5,
    style: 'Pixar 3D',
    text: "Leo gasped when he saw himself on the cover. He's asked to read it every single night for two weeks straight. I've bought personalized books before and they never came close to this — it's actually his story, not just his name pasted in.",
  },
  {
    name: 'David & Priya K.',
    role: 'Parents of Anaya, age 4',
    color: '#F2818A',
    stars: 5,
    style: 'Anime',
    text: 'The anime style was absolutely perfect for Anaya and the vocabulary was just right for her age. We were honestly surprised by the quality of the book itself — it feels like something you\'d find in a bookstore. She calls it "my special book" and won\'t let anyone else touch it.',
  },
  {
    name: 'Marcus T.',
    role: 'Dad of twins, age 8',
    color: '#7EC4EB',
    stars: 5,
    style: 'Superhero',
    text: "Got one for each twin with completely different stories and styles. Best birthday gift we've ever given, full stop. They actually argued (nicely) about whose book was better. They treasure them. Worth every penny.",
  },
  {
    name: 'Grandma Cheryl',
    role: 'Grandma of Maisie, age 5',
    color: '#9D8DF1',
    stars: 5,
    style: 'Watercolor',
    text: "I ordered this as a Christmas gift and cried when I saw the preview. Maisie's little face in that watercolor style looked like a painting you'd frame on the wall. She made her mom read it to her three times before bed on Christmas night. I'm already ordering one for my other grandchild.",
  },
  {
    name: 'Jennifer R.',
    role: 'Mom of Eli, age 7',
    color: '#6FCF97',
    stars: 5,
    style: 'Classic',
    text: "Eli is a reluctant reader and I was desperate to find something that would get him excited about books. This worked. He sat down and read the whole thing himself the day it arrived and then asked if we could get another one. I've recommended it to every parent I know.",
  },
  {
    name: 'Thomas & Amy W.',
    role: 'Parents of Clara, age 3',
    color: '#F7B41C',
    stars: 5,
    style: 'Claymation',
    text: 'We were a little skeptical at first — how different could it really be from the other personalized books? Very different. The story is genuinely written around our daughter, her personality, her favorite things. The claymation style is adorable and the pages are so sturdy. She carries it everywhere.',
  },
  {
    name: 'Brittany L.',
    role: 'Aunt of Noah, age 9',
    color: '#3FA0DC',
    stars: 5,
    style: 'Superhero',
    text: "Bought this for my nephew's birthday and his mom texted me saying it was 'the best gift he's ever gotten.' He's nine and thought he was too old for picture books until this one arrived. The superhero style was so well done and the story had him laughing out loud. Absolute hit.",
  },
  {
    name: 'Rosa M.',
    role: 'Mom of twins Sofia & Lucas, age 6',
    color: '#F2818A',
    stars: 5,
    style: 'Pixar 3D',
    text: "Ordered one for each of my twins and had both of them in the same story together. I didn't know you could do that! Sofia and Lucas both screamed when they opened it and saw themselves on the same page. It's been two months and it's still the first book they reach for at bedtime.",
  },
  {
    name: 'Kevin D.',
    role: 'Dad of Harper, age 5',
    color: '#FFD45E',
    stars: 5,
    style: 'Watercolor',
    text: "The preview approval step is genius. They sent us a full preview and we asked for one small change — Harper's hair color looked slightly off — and they fixed it same day, no questions asked. The final book was perfect. That level of care really sets them apart.",
  },
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="rev-stars">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" size={16} style={{ color: '#F7B41C' }} />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <div className="reviews-page">
      <div className="reviews-wrap">
        <Link href="/" className="policy-back">← Back to home</Link>

        {/* Header */}
        <div className="reviews-hero">
          <div className="story-eyebrow">Customer Reviews</div>
          <h1>The look on their face is <span className="h-red">everything</span></h1>
          <p className="story-lead">Real families. Real reactions. Real little heroes.</p>

          <div className="reviews-summary">
            <div className="rs-score">4.9</div>
            <div className="rs-right">
              <div className="rs-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={24} style={{ color: '#F7B41C' }} />
                ))}
              </div>
              <div className="rs-count">Based on 3,400+ verified reviews</div>
            </div>
          </div>
        </div>

        {/* Review grid */}
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div className="rev-card-full" key={i}>
              <div className="rev-card-top">
                <span className="ava" style={{ background: `radial-gradient(circle at 35% 30%, #fff8, ${r.color})`, width: 48, height: 48, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-role">{r.role}</div>
                </div>
                <div className="rev-style-tag">{r.style}</div>
              </div>
              <StarRow count={r.stars} />
              <p className="rev-text">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="story-cta" style={{ marginTop: 72 }}>
          <h3>Ready to create yours?</h3>
          <p>Join thousands of families who&apos;ve already made their child the hero.</p>
          <Link href="/" className="btn btn-gold btn-lg story-cta-btn">
            <Icon name="wand" size={18} /> Create your book — $99
          </Link>
        </div>
      </div>
    </div>
  )
}
