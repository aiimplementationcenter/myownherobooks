import type { Metadata } from 'next'
import { Baloo_2, Nunito } from 'next/font/google'
import './globals.css'

const baloo = Baloo_2({ subsets: ['latin'], weight: ['500','600','700','800'], variable: '--font-baloo' })
const nunito = Nunito({ subsets: ['latin'], weight: ['400','600','700','800','900'], style: ['normal','italic'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'My Own Hero Books — Personalized storybooks for kids',
  description: 'A personalized storybook where your child is the hero — in their favorite illustration style, written for their exact reading level.',
  other: {
    'p:domain_verify': 'd68ecc087cc7e617de91ac01de72408f',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${baloo.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  )
}
