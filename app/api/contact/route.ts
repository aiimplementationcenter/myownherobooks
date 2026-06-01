import { NextRequest, NextResponse } from 'next/server'
import { getTransporter } from '@/lib/mailer'

const OWNER_EMAIL = 'jdillon@prckc.com'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    const mailer = getTransporter()
    const fromAddress = process.env.SMTP_FROM ?? process.env.SMTP_USER!

    // Notify owner — this must succeed
    await mailer.sendMail({
      from: `"My Own Hero Books" <${fromAddress}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `Contact: ${subject || 'New message'} — ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#16265A">New Contact Form Message</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 12px;font-weight:bold;color:#16265A">Name</td><td style="padding:6px 12px">${name}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;color:#16265A">Email</td><td style="padding:6px 12px">${email}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;color:#16265A">Subject</td><td style="padding:6px 12px">${subject || '—'}</td></tr>
        </table>
        <h3 style="font-family:sans-serif;color:#16265A">Message</h3>
        <p style="font-family:sans-serif;font-size:15px;line-height:1.7;color:#333;white-space:pre-wrap">${message}</p>
        <p style="font-family:sans-serif;color:#888;font-size:12px;margin-top:24px">Hit reply to respond directly to ${name}.</p>
      `,
    })

    // Auto-reply to sender — wrapped separately so it never breaks the response
    try {
      await mailer.sendMail({
        from: `"My Own Hero Books" <${fromAddress}>`,
        to: email,
        subject: `We got your message!`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#16265A">
            <h1 style="color:#E0414E">Thanks for reaching out! 👋</h1>
            <p>Hi ${name.split(' ')[0]},</p>
            <p>We received your message and will get back to you within 1–2 business days.</p>
            <p>Talk soon,<br/><strong>The My Own Hero Books team</strong></p>
          </div>
        `,
      })
    } catch {
      // Auto-reply failure is non-fatal — owner notification already sent
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Contact form error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
