import HydratedFeed from '@/components/main/HydratedFeed'
import getQueryClient from '@/hooks/getQueryClient'
import { fetchPictures } from '@/lib/ui-fetcher'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function Home() {
  const queryClient = getQueryClient()
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - 10)

  await queryClient.prefetchQuery({
    queryKey: [`p`, { startDate, endDate }],
    queryFn: fetchPictures,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HydratedFeed startDate={startDate} endDate={endDate} />
    </HydrationBoundary>
  )
  return (
    <main className='w-full h-full'>
      <div className='flex flex-col gap-20'>
        <h1>Hello Space & Astronomy</h1>
      </div>
    </main>
  )
}
