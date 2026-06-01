import nodemailer from 'nodemailer'

export function getTransporter() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error(
      `SMTP not configured. Missing: ${[
        !host && 'SMTP_HOST',
        !user && 'SMTP_USER',
        !pass && 'SMTP_PASS',
      ].filter(Boolean).join(', ')}`
    )
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== 'false', // defaults to true (port 465)
    auth: { user, pass },
  })
}
