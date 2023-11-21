'use server'

import { PicturesResult } from '@/types'
import { getBaseUrl } from '../lib/ui-helper'

export const fetchPictures = async (page: number) => {
  console.log(`fetchPictures with (${page})`)
  console.log('APP_TOKEN:', process.env.APP_TOKEN)

  const perPage = 5

  const currentDate = new Date()
  const endDate = new Date()
  endDate.setDate(currentDate.getDate() - (perPage * (page - 1) + 1))
  const startDate = new Date()
  startDate.setDate(currentDate.getDate() - perPage * page)

  let isOk = true
  const res: PicturesResult = await fetch(`${getBaseUrl()}/api/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: process.env.APP_TOKEN,
      start: startDate,
      end: endDate,
    }),
  })
    .then((res) => {
      isOk = res.ok
      return res.json()
    })
    .then((body) => {
      if (!isOk) {
        console.error(
          'Error during fetch occured [',
          body.status,
          ' - ',
          body.message,
          ']',
        )
        throw new Error(body.message)
      }

      return { isError: false, data: body.data, message: '' }
    })
    .catch((e: Error) => {
      // We catch everything that can wrongly happen
      return { isError: true, data: [], message: e.message }
    })
  console.log('fetchPictures', { res })
  return res
}
