import { NextResponse } from 'next/server'
import { Result, initResult } from '..'
import NasaApiClient from '../NasaApiClient'

export async function POST(request: Request) {
  var res: Result = initResult()
  try {
    const body = await request.json()
    const { start, end } = body
    console.log(`GET /api/feed with ${start}, ${end}`, { res })

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
      })
  } catch (e: any) {
    res.error.message = e.message
  }
  console.log('res', { res })

  return NextResponse.json(res, {
    status: res.error?.message !== '' ? 400 : 200,
  })
}
