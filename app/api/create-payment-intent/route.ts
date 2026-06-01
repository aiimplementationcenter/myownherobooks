import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, age, style, themes, story, email, coverType, photoUrls, orderNumber } = body

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: 9900, // $99.00 in cents
      currency: 'usd',
      // receipt_email set on confirmPayment once user types it in checkout
      ...(email ? { receipt_email: email } : {}),
      metadata: {
        orderNumber,
        customerName: name,
        childAge: String(age),
        illustrationStyle: style ?? '',
        coverType: coverType ?? 'hardcover',
        themes: (themes as string[]).join(', '),
        storyNotes: story?.slice(0, 500) ?? '',
        photoUrls: (photoUrls as string[]).join('\n'),
        photoCount: String((photoUrls as string[]).length),
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
