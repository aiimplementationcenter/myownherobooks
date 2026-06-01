import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const orderNumber = formData.get('orderNumber') as string
    const files = formData.getAll('photos') as File[]

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadPromises = files.map(async (file, i) => {
      const ext = file.name.split('.').pop() ?? 'jpg'
      const blob = await put(
        `orders/${orderNumber}/photo-${i + 1}.${ext}`,
        file,
        { access: 'public', addRandomSuffix: false }
      )
      return blob.url
    })

    const urls = await Promise.all(uploadPromises)
    return NextResponse.json({ urls })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
