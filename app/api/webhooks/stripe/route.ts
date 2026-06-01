import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { Resend } from 'resend'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const resend = new Resend(process.env.RESEND_API_KEY)

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent
    const m = pi.metadata

    const photoList = m.photoUrls
      ? m.photoUrls.split('\n').map((u, i) => `<li><a href="${u}">Photo ${i + 1}</a></li>`).join('')
      : '<li>No photos uploaded</li>'

    // Notify business owner
    await resend.emails.send({
      from: 'orders@myownherobooks.com',
      to: process.env.OWNER_EMAIL!,
      subject: `New Order ${m.orderNumber} — ${m.customerName}`,
      html: `
        <h2>New Book Order — ${m.orderNumber}</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 12px;font-weight:bold">Child's Name</td><td style="padding:6px 12px">${m.customerName}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Age</td><td style="padding:6px 12px">${m.childAge}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Style</td><td style="padding:6px 12px">${m.illustrationStyle}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Themes</td><td style="padding:6px 12px">${m.themes}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Story Notes</td><td style="padding:6px 12px">${m.storyNotes || '—'}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Customer Email</td><td style="padding:6px 12px">${pi.receipt_email ?? '—'}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Amount</td><td style="padding:6px 12px">$${(pi.amount / 100).toFixed(2)}</td></tr>
        </table>
        <h3>Photos (${m.photoCount})</h3>
        <ul>${photoList}</ul>
        <p style="color:#888;font-size:12px">Stripe PaymentIntent: ${pi.id}</p>
      `,
    })

    // Confirmation to customer
    if (pi.receipt_email) {
      await resend.emails.send({
        from: 'hello@myownherobooks.com',
        to: pi.receipt_email,
        subject: `Your book is being created! Order ${m.orderNumber}`,
        html: `
          <div style="font-family:'Nunito',sans-serif;max-width:560px;margin:0 auto;color:#16265A">
            <h1 style="color:#E0414E">Your magic is in motion! 🎨</h1>
            <p>Hi there,</p>
            <p>We've received your order for <strong>${m.customerName}</strong>'s personalized storybook and our illustrators are already at work.</p>
            <table style="border-collapse:collapse;font-size:14px;width:100%">
              <tr><td style="padding:6px 12px;font-weight:bold">Order Number</td><td style="padding:6px 12px">${m.orderNumber}</td></tr>
              <tr><td style="padding:6px 12px;font-weight:bold">Style</td><td style="padding:6px 12px">${m.illustrationStyle}</td></tr>
              <tr><td style="padding:6px 12px;font-weight:bold">Themes</td><td style="padding:6px 12px">${m.themes}</td></tr>
            </table>
            <p style="margin-top:24px">We'll be in touch within 3–5 business days with a preview. Questions? Reply to this email anytime.</p>
            <p>With love,<br/><strong>The My Own Hero Books team</strong></p>
          </div>
        `,
      })
    }
  }

  return NextResponse.json({ received: true })
}
