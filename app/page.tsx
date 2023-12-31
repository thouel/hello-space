import { fetchPictures } from '@/actions/fetchPictures'
import InfinitePictures from '@/components/main/InfinitePictures'
import BackToTopButton from '@/components/sub/BackToTopButton'
import Title from '@/components/sub/Title'

export default async function Home() {
  const { isError, message, data } = await fetchPictures(1)

  if (isError) {
    throw new Error(message)
  }

  return (
    <>
      <Title />
      <InfinitePictures initialPictures={data} />
      <BackToTopButton />
    </>
  )
}
