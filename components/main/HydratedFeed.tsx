'use client'

import { fetchPictures } from '@/lib/ui-fetcher'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function HydratedFeed({
  startDate,
  endDate,
}: {
  startDate: Date
  endDate: Date
}) {
  console.log(`>> fetching pictures ${startDate} ${endDate}`)
  const { isPending, isError, data, error } = useQuery({
    queryKey: [`p`, { startDate, endDate }],
    queryFn: fetchPictures,
  })

  if (isPending) {
    return null
  }

  if (isError) {
    console.error('An error occured while fetching pictures')
  }

  return (
    <>
      <ul>
        {data?.data
          .filter((p) => p.media_type === 'image')
          .map((p) => (
            <li key={p.date} className='max-w-lg'>
              <div className='flex flex-col gap-3 p-4 m-4 shadow-lg'>
                <Image
                  src={p.hdurl?.toString() ?? p.url.toString()}
                  width={500}
                  height={500}
                  alt={p.title}
                />
                <p className='text-xl font-bold'>{p.title}</p>
                <p>{p.explanation}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}
