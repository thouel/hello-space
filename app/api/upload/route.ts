import { put, del } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')
  const folder = searchParams.get('folder')

  if (!request.body) {
    throw new Error('Cannot process this')
  }
  if (!folder) {
    throw new Error('No folder provided')
  }
  if (!filename) {
    throw new Error('No file provided')
  }

  const blob = await put(folder + '/' + filename, request.body, {
    access: 'public',
  })

  return NextResponse.json(blob)
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    throw new Error('No file provided')
  }

  await del(url)

  return NextResponse.json({ message: 'OK' })
}
