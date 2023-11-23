import Pictures from '@/components/main/Pictures'
import LoadMore from '@/components/sub/LoadMore'
import { fetchPictures } from '@/actions/fetchPictures'

export default async function Home() {
  const { isError, message, data } = await fetchPictures(1)

  if (isError) {
    throw new Error(message)
  }

  return (
    <main className='container w-full h-full max-w-3xl min-h-screen px-4 py-8 mx-auto sm:max-w-4xl md:max-w-5xl lg:max-w-6xl'>
      <h1 className='mb-4 text-3xl font-bold text-center'>
        Hello Space & Astronomy
      </h1>
      {
        <div className='sm:columns-3 md:columns-4 lg:columns-5 columns-2 gap-x-1'>
          <Pictures pictures={data} />
          <LoadMore />
        </div>
      }
    </main>
  )
}
