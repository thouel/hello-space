import Pictures from '@/components/main/Pictures'
import LoadMore from '@/components/sub/LoadMore'
import { PicturesResult } from '@/types'
import { getBaseUrl } from '../lib/ui-helper'
import { log } from '@logtail/next'

export const dynamic = 'force-dynamic' // Otherwise, nextjs thinks this is a static page that can be generated during build stage

const fetchPictures = async (page: number) => {
  log.info(`fetchPictures with page = ${page}`)
  const perPage = 5
  const currentDate = new Date()
  const endDate = new Date()
  endDate.setDate(currentDate.getDate() - (perPage * (page - 1) + 1))
  const startDate = new Date()
  startDate.setDate(currentDate.getDate() - perPage * page)

  let isOk = true
  log.info(`fetching ${getBaseUrl()}/api/feed`)
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
      log.info(`rcvd ${res}`)
      isOk = res.ok
      return res.json()
    })
    .then((body) => {
      log.info(`rcvd ${body}`)
      if (!isOk) {
        log.error(
          `Error during fetch occured [${body.status} - ${body.message}]`,
        )
        throw new Error(body.message)
      }

      return { isError: false, data: body.data, message: '' }
    })
    .catch((e: Error) => {
      // We catch everything that can wrongly happen
      return { isError: true, data: [], message: e.message }
    })
  log.info('fetchPictures', { res })
  return res
}

export default async function Home() {
  const { isError, message, data } = await fetchPictures(1)

  if (isError) {
    throw new Error(message)
  }

  return (
    <main className='container w-full h-full max-w-5xl min-h-screen px-4 py-8 mx-auto'>
      <h1 className='mb-4 text-3xl font-bold text-center'>
        Hello Space & Astronomy
      </h1>
      {
        <div className='grid grid-cols-1 gap-4'>
          <Pictures pictures={data} />
          <LoadMore />
        </div>
      }
    </main>
  )
}
