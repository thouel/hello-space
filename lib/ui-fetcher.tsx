'use server'
import { PicturesResult, initPicturesResult } from '@/app/api'
import { QueryKey } from '@tanstack/react-query'
import { getBaseUrl } from './ui-helper'

export const fetchPictures = async ({
  queryKey,
}: {
  queryKey: QueryKey
}): Promise<PicturesResult> => {
  const { startDate, endDate } = queryKey[1]

  console.log(`fetchPictures with (${startDate}, ${endDate})`)
  var res = initPicturesResult()
  await fetch(`${getBaseUrl()}/api/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: process.env.APP_TOKEN,
      start: startDate,
      end: endDate,
    }),
  })
    .then((res) => res.json())
    .then(({ data, error }) => {
      if (error?.message != '') {
        throw new Error(error)
      }
      res.data = data
    })
  console.log('fetchPictures', { res })
  return res
}
