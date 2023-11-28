import { fetchPictures } from '@/actions/fetchPictures'
import InfinitePictures from '@/components/main/InfinitePictures'
import BackToTopButton from '@/components/sub/BackToTopButton'

export default async function Home() {
  const { isError, message, data } = await fetchPictures(1)

  if (isError) {
    throw new Error(message)
  }

  return (
    <>
      <h1 className='mb-4 text-xl font-bold text-center'>
        Hello Space & Astronomy
      </h1>
      <InfinitePictures initialPictures={data} />
      <BackToTopButton />
    </>
  )
}
