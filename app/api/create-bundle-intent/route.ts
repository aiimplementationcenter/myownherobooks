import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderNumber, child1, child2, photoUrls1, photoUrls2 } = body

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: 13800, // $138.00 in cents
      currency: 'usd',
      ...(body.email ? { receipt_email: body.email } : {}),
      metadata: {
        orderNumber,
        bundleOrder: 'true',
        // Child 1
        child1Name: child1.name,
        child1Age: String(child1.age),
        child1Style: child1.style ?? '',
        child1Cover: child1.coverType ?? 'hardcover',
        child1Themes: (child1.themes as string[]).join(', '),
        child1Story: child1.story?.slice(0, 300) ?? '',
        child1Photos: (photoUrls1 as string[]).join('\n'),
        // Child 2
        child2Name: child2.name,
        child2Age: String(child2.age),
        child2Style: child2.style ?? '',
        child2Cover: child2.coverType ?? 'hardcover',
        child2Themes: (child2.themes as string[]).join(', '),
        child2Story: child2.story?.slice(0, 300) ?? '',
        child2Photos: (photoUrls2 as string[]).join('\n'),
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
