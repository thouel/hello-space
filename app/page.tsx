import Pictures from '@/components/main/Pictures'
import LoadMore from '@/components/sub/LoadMore'
import { fetchPictures } from '@/actions/fetchPictures'

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
