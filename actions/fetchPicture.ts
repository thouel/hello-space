'use server'
import { PictureResult } from '@/types'
import { log } from '@logtail/next'
import NasaApiClient from '@/lib/NasaApiClient'

export const fetchPicture = async (date: string): Promise<PictureResult> => {
  log.debug(`fetchPicture with date=${date}`)

  const res: PictureResult = await callApi({
    date: date,
  })
  // log.debug('fetchPictures', { res })
  return res
}

interface CallApiProps {
  date: string
}

const isValidDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(date)
}

const callApi = async (props: CallApiProps) => {
  log.info('callApi with', props)
  var res: PictureResult = {
    message: '',
    data: null,
    isError: false,
  }

  const { date } = props

  if (date === undefined) {
    throw new Error('No date found')
  }

  if (!isValidDate(date)) {
    throw new Error('Date is not valid')
  }

  const client = new NasaApiClient()
  await client
    .fetchOne(date)
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
