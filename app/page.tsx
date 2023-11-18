import Pictures from '@/components/main/Pictures'
import LoadMore from '@/components/sub/LoadMore'
import { fetchPictures } from '@/actions/ui-fetcher'
import { toast } from 'react-toastify'

export const dynamic = 'force-dynamic' // Otherwise, nextjs thinks this is a static page that can be generated during build stage

export default async function Home() {
  const pictures = await fetchPictures(1)

  return (
    <main className='container w-full h-full max-w-5xl min-h-screen px-4 py-8 mx-auto'>
      <h1 className='mb-4 text-3xl font-bold text-center'>
        Hello Space & Astronomy
      </h1>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        <Pictures pictures={pictures.data} />
        <LoadMore />
      </div>
      {pictures.error.message != ''
        ? toast.error(pictures.error.message)
        : null}
    </main>
  )
}
