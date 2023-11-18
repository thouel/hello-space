'use server'
import { PicturesResult, initPicturesResult } from '@/types'
import { getBaseUrl } from '../lib/ui-helper'

export const fetchPictures = async (page: number) => {
  console.log(`fetchPictures with (${page})`)
  const perPage = 5

  const currentDate = new Date()
  const endDate = new Date()
  endDate.setDate(currentDate.getDate() - (perPage * (page - 1) + 1))
  const startDate = new Date()
  startDate.setDate(currentDate.getDate() - perPage * page)

  var res = initPicturesResult()
  await fetch(`/api/feed`, {
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
  return res as PicturesResult
}
