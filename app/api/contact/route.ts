import { NextRequest, NextResponse } from 'next/server'
import { getTransporter } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    const mailer = getTransporter()
    const fromAddress = process.env.SMTP_FROM ?? process.env.SMTP_USER!

    // Notify owner
    await mailer.sendMail({
      from: `"My Own Hero Books" <${fromAddress}>`,
      to: process.env.OWNER_EMAIL!,
      replyTo: `"${name}" <${email}>`,
      subject: `Contact Form: ${subject || 'New message'} — ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 12px;font-weight:bold">Name</td><td style="padding:6px 12px">${name}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Email</td><td style="padding:6px 12px">${email}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Subject</td><td style="padding:6px 12px">${subject || '—'}</td></tr>
        </table>
        <h3>Message</h3>
        <p style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#333">${message.replace(/\n/g, '<br/>')}</p>
        <p style="color:#888;font-size:12px">Reply directly to this email to respond to ${name}.</p>
      `,
    })

    // Auto-reply to sender
    await mailer.sendMail({
      from: `"My Own Hero Books" <${fromAddress}>`,
      to: email,
      subject: `We got your message, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:'Nunito',sans-serif;max-width:560px;margin:0 auto;color:#16265A">
          <h1 style="color:#E0414E">Thanks for reaching out! 👋</h1>
          <p>Hi ${name.split(' ')[0]},</p>
          <p>We received your message and will get back to you within 1–2 business days.</p>
          <p>In the meantime, you might find an answer in our <a href="https://myownherobooks.com/#faq" style="color:#16265A">FAQ section</a>.</p>
          <p>Talk soon,<br/><strong>The My Own Hero Books team</strong></p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
