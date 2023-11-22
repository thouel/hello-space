import { NextResponse } from 'next/server'
import NasaApiClient from '../lib/NasaApiClient'
import { PicturesResult } from '@/types'
import { log } from '@logtail/next'

export async function POST(request: Request) {
  log.info(`POST /api/feed before parsing body`)
  var res: PicturesResult = new PicturesResult()
  try {
    const body = await request.json()
    const { start, end } = body
    log.info(`POST /api/feed with ${start}, ${end}`, { res })

    if (start === undefined || end === undefined) {
      throw new Error('No dates found')
    }
    const sd: Date = new Date(start)
    const ed: Date = new Date(end)

    if (sd.getTime() > ed.getTime()) {
      throw new Error('Dates are messed up')
    }

    const client = new NasaApiClient()
    await client
      .fetchRange(sd, ed)
      .then((r) => r.json())
      .then((data) => {
        res.data = data
        res.isError = false
      })
  } catch (e: any) {
    res.message = e.message
    res.isError = true
  }
  log.info('POST /api/feed result', { res })

  return NextResponse.json(res, {
    status: res.message !== '' ? 400 : 200,
  })
}
