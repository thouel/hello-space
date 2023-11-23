import { fetchPicture } from '@/actions/fetchPicture'
import PictureModal from '@/components/main/PictureModal'
import { log } from '@logtail/next'

interface PageProps {
  date: string
}

export default async function ModalPictureByDatePage({
  params,
}: {
  params: PageProps
}) {
  const { date } = params
  log.debug('in MODAL', { date })
  const { isError, message, data } = await fetchPicture(date)

  log.debug('found picture', { isError, message, data })

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
      <PictureModal picture={data} />
    </>
  )
}
