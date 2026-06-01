import { NextRequest, NextResponse } from 'next/server'
import { put, head, getDownloadUrl } from '@vercel/blob'
import { getTransporter } from '@/lib/mailer'

export interface Review {
  id: string
  name: string
  role: string
  stars: number
  style: string
  text: string
  date: string
  color: string
}

const BLOB_KEY = 'reviews/data.json'
const COLORS = ['#FFD45E', '#F2818A', '#7EC4EB', '#9D8DF1', '#6FCF97', '#F7B41C', '#3FA0DC']

async function readReviews(): Promise<Review[]> {
  try {
    const info = await head(BLOB_KEY)
    if (!info) return []
    const url = getDownloadUrl(info.url)
    const res = await fetch(url, { cache: 'no-store' })
    return await res.json()
  } catch {
    return []
  }
}

async function writeReviews(reviews: Review[]) {
  await put(BLOB_KEY, JSON.stringify(reviews), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  })
}

export async function GET() {
  const reviews = await readReviews()
  return NextResponse.json(reviews)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, role, stars, style, text } = body

    if (!name || !text || !stars) {
      return NextResponse.json({ error: 'Name, review text, and star rating are required.' }, { status: 400 })
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      role: role?.trim() ?? '',
      stars: Math.min(5, Math.max(1, Number(stars))),
      style: style?.trim() ?? '',
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }

    const existing = await readReviews()
    await writeReviews([newReview, ...existing])

    // Notify owner
    try {
      const mailer = getTransporter()
      const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!
      await mailer.sendMail({
        from: `"My Own Hero Books" <${from}>`,
        to: process.env.OWNER_EMAIL!,
        subject: `New Review from ${newReview.name} — ${newReview.stars}★`,
        html: `
          <h2>New Customer Review</h2>
          <p><strong>${newReview.name}</strong> (${newReview.role || 'Customer'}) left a ${newReview.stars}-star review:</p>
          <blockquote style="border-left:4px solid #F7B41C;margin:16px 0;padding:12px 16px;font-style:italic;color:#333">"${newReview.text}"</blockquote>
          <p>Style: ${newReview.style || '—'}</p>
          <p>View all reviews at <a href="https://myownherobooks.com/reviews">myownherobooks.com/reviews</a></p>
        `,
      })
    } catch { /* don't fail the request if email fails */ }

    return NextResponse.json({ success: true, review: newReview })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
