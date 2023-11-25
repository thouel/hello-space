import { displayDate } from '@/lib/ui-helper'
import { Picture } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PictureCard = ({ picture }: { picture: Picture }) => {
  return (
    <div className='shadow-xl card lg:card-side bg-base-200 dark:bg-black dark:text-white/90'>
      <figure>
        {picture.media_type === 'image' ? (
          <Link href={`/p/${picture.date}`}>
            <Image
              src={picture.hdurl?.toString() ?? picture.url.toString()}
              width={1000}
              height={1000}
              alt={picture.title}
              className=''
            />
          </Link>
        ) : null}
      </figure>
      <div className='max-w-full px-8 py-0 lg:max-w-lg card-body'>
        <h2 className='min-h-0 mb-2 text-lg sm:text-xl md:text-2xl card-title'>
          <p>{picture.title}</p>
        </h2>
        <div className='mb-2 text-sm text-justify'>{picture.explanation}</div>
        <div className='flex flex-row justify-between mb-4 text-xs sm:text-sm md:text-base'>
          <div className='w-3/5 h-full badge badge-sm badge-outline'>
            &copy; {picture.copyright}
          </div>
          <div className='h-full badge badge-sm badge-outline'>
            {displayDate(picture.date)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PictureCard
