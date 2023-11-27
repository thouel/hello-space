'use server'
import { PicturesResult } from '@/types'
import { log } from '@logtail/next'
import NasaApiClient from '@/lib/NasaApiClient'
import { FETCH_PICTURES_BY } from '@/constants'

export const fetchPictures = async (page: number) => {
  log.info(`fetchPictures with page = ${page}`)
  const perPage = FETCH_PICTURES_BY
  const currentDate = new Date()
  const endDate = new Date()
  endDate.setDate(currentDate.getDate() - (perPage * (page - 1) + 1))
  const startDate = new Date()
  startDate.setDate(currentDate.getDate() - perPage * page)

  const res: PicturesResult = await callApi({
    start: startDate,
    end: endDate,
  })
  // log.debug('fetchPictures', { res })
  return res
}

interface CallApiProps {
  start: Date
  end: Date
}

const callApi = async (props: CallApiProps) => {
  log.info('callApi with', props)
  var res: PicturesResult = {
    message: '',
    data: [],
    isError: false,
  }

  const { start, end } = props

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
    .catch((e: any) => {
      throw new Error(e.message)
    })

  return res
}
