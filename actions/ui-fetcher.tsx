'use server'
import { PicturesResult, initPicturesResult } from '@/types'
import { getBaseUrl } from '../lib/ui-helper'
import { RedirectType, redirect } from 'next/navigation'

export const fetchPictures = async (page: number) => {
  console.log(`fetchPictures with (${page})`)
  const perPage = 5

  const currentDate = new Date()
  const endDate = new Date()
  endDate.setDate(currentDate.getDate() - (perPage * (page - 1) + 1))
  const startDate = new Date()
  startDate.setDate(currentDate.getDate() - perPage * page)

  var res = initPicturesResult()
  await fetch(`${getBaseUrl()}/api/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: process.env.APP_TOKEN2,
      start: startDate,
      end: endDate,
    }),
  })
    .then((res) => res.json())
    .then(({ status, error, data }) => {
      if (status != 200) {
        throw new Error(error.message)
      }
      res.data = data
    })
  console.log('fetchPictures', { res })
  return res as PicturesResult
}
