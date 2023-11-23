import { fetchPicture } from '@/actions/fetchPicture'
import PictureFullScreen from '@/components/main/PictureFullScreen'
import { log } from '@logtail/next'

interface PageProps {
  date: string
}

export default async function PictureByDatePage({
  params,
}: {
  params: PageProps
}) {
  const { date } = params
  log.debug('rcvd date', { date })
  const { isError, message, data } = await fetchPicture(date)

  // log.debug('found picture', { isError, message, data })

  if (isError) {
    log.error(message)
    throw new Error(message)
  }
  if (!data) {
    log.error('data is null')
    throw new Error('An error occured with the picture')
  }

  return (
    <>
      <PictureFullScreen picture={data} />
    </>
  )
}
