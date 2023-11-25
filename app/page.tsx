import { fetchPictures } from '@/actions/fetchPictures'
import InfinitePictures from '@/components/main/InfinitePictures'

export default async function Home() {
  const { isError, message, data } = await fetchPictures(1)

  if (isError) {
    throw new Error(message)
  }

  return (
    <main className='w-full h-full max-w-3xl min-h-screen px-4 py-8 mx-auto sm:max-w-4xl md:max-w-5xl lg:max-w-6xl'>
      <h1 className='mb-4 text-3xl font-bold text-center'>
        Hello Space & Astronomy
      </h1>
      <InfinitePictures initialPictures={data} />
    </main>
  )
}
