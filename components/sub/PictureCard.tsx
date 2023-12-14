import { displayDate } from '@/lib/ui-helper'
import { Picture } from '@/types'
import Image from 'next/image'
import React from 'react'
import PictureCardActions from './PictureCardActions'

const PictureCard = ({ picture }: { picture: Picture }) => {
  return (
    <div className='shadow-xl card lg:card-side'>
      <figure>
        {picture.media_type === 'image' ? (
          <Image
            src={picture.hdurl?.toString() ?? picture.url.toString()}
            width={1000}
            height={1000}
            alt={picture.title}
            className=''
          />
        ) : null}
      </figure>
      <div className='max-w-full px-2 py-1 card-body'>
        <h2 className='mb-2 text-lg card-title'>
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
        <PictureCardActions picture={picture} />
      </div>
    </div>
  )
}

export default PictureCard
