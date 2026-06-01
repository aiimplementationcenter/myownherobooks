import Link from 'next/link'
import type { Metadata } from 'next'
import Icon from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: 'Our Story — My Own Hero Books',
  description: 'How a dad of 5 and grandpa of 2 turned a personal mission into personalized storybooks that truly star your child.',
}

export default function OurStoryPage() {
  return (
    <div className="story-page">
      <div className="story-wrap">
        <Link href="/" className="policy-back">← Back to home</Link>

        {/* Hero */}
        <div className="story-hero">
          <div className="story-eyebrow">Our Story</div>
          <h1>Built by a dad who wanted <span className="h-red">more</span> for his kids</h1>
          <p className="story-lead">Five kids. Two grandkids. And a stubborn belief that every child deserves a story that&apos;s actually <em>theirs</em>.</p>
        </div>

        {/* Story body */}
        <div className="story-body">

          <div className="story-section">
            <div className="story-num">01</div>
            <div className="story-content">
              <h2>The gift that was almost right</h2>
              <p>When you have five kids, you get good at finding gifts that feel special. Personalized storybooks seemed like a perfect idea — a book with your child&apos;s name in it, how magical is that?</p>
              <p>Except when the books arrived, the magic wore off fast. Their name was on the cover. Maybe dropped into a sentence or two. But the story? Generic. The hero? A placeholder. It wasn&apos;t <em>their</em> adventure — it was just a template with a name swap.</p>
              <p>My kids noticed. And honestly, so did I.</p>
            </div>
          </div>

          <div className="story-section">
            <div className="story-num">02</div>
            <div className="story-content">
              <h2>So I started making them myself</h2>
              <p>I&apos;m a dad who likes to solve problems. So I started writing the books myself — stories built around my kids&apos; real personalities, their favorite things, their quirks, their dreams. Stories where they weren&apos;t just mentioned but were genuinely the hero at the center of the whole adventure.</p>
              <p>The difference was immediate. These weren&apos;t books my kids tolerated at bedtime — these were books they <em>asked for</em>. Books they carried around and showed to friends. Books that made them feel seen.</p>
              <p>Then my grandkids came along, and the tradition continued.</p>
            </div>
          </div>

          <div className="story-section">
            <div className="story-num">03</div>
            <div className="story-content">
              <h2>Other families started asking</h2>
              <p>Word gets around. Friends and family started asking if I could make books for their kids too. Then friends of friends. What started as something personal and handmade quietly grew into something bigger.</p>
              <p>Every book I made for someone else&apos;s child had the same effect — that moment when a kid opens a book and realizes it&apos;s about <em>them</em>, really truly them, is something you never get tired of seeing. Parents would send me videos. Grandparents would cry. Kids would make their parents read it five nights in a row.</p>
              <p>That reaction never got old.</p>
            </div>
          </div>

          <div className="story-section">
            <div className="story-num">04</div>
            <div className="story-content">
              <h2>My Own Hero Books was born</h2>
              <p>My Own Hero Books exists because every child deserves a story that truly belongs to them — not a template, not a name swap, but a real adventure written around who they actually are, illustrated in a style that suits them, and calibrated to exactly where they are as a reader.</p>
              <p>It&apos;s still a personal, hands-on project. Every book is made with the same care I put into the ones I made for my own kids and grandkids. And every time a family sends us a photo of their little one clutching their book at bedtime, it reminds us exactly why we do this.</p>
            </div>
          </div>

        </div>

        {/* Stats bar */}
        <div className="story-stats">
          <div className="story-stat">
            <span className="ss-num">5</span>
            <span className="ss-lbl">Kids of my own</span>
          </div>
          <div className="story-stat">
            <span className="ss-num">2</span>
            <span className="ss-lbl">Grandkids (and counting)</span>
          </div>
          <div className="story-stat">
            <span className="ss-num">12k+</span>
            <span className="ss-lbl">Families served</span>
          </div>
          <div className="story-stat">
            <span className="ss-num">4.9★</span>
            <span className="ss-lbl">Average rating</span>
          </div>
        </div>

        {/* CTA */}
        <div className="story-cta">
          <h3>Ready to make your child the hero?</h3>
          <p>It takes about 5 minutes to set up. We handle everything else.</p>
          <Link href="/" className="btn btn-gold btn-lg story-cta-btn">
            <Icon name="wand" size={18} /> Create your book — $99
          </Link>
        </div>

      </div>
    </div>
  )
}
