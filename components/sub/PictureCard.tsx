import { Picture } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PictureCard = ({ picture }: { picture: Picture }) => {
  return (
    <div className='shadow-xl card lg:card-side bg-base-200'>
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
      <div className='max-w-full lg:max-w-lg card-body'>
        <h2 className='min-h-0 py-0 text-lg sm:text-xl md:text-2xl card-title'>
          <p>{picture.title}</p>
        </h2>
        <div className='flex flex-row justify-between text-xs sm:text-sm md:text-base'>
          <span className='w-3/5'>&copy; {picture.copyright}</span>
          <span className='w-1/5 text-right'>{picture.date}</span>
        </div>

        <p className='text-sm text-justify'>{picture.explanation}</p>

        <div className='justify-end card-actions'>
          <div className='italic badge badge-ghost'></div>
        </div>
      </div>
    </div>
  )
}

export default PictureCard
