import { Picture } from '@/types'
import Image from 'next/image'
import React from 'react'

export default function PictureOfTheDay({ picture }: { picture: Picture }) {
  return (
    <>
      <div className='shadow-xl card card-compact bg-base-100'>
        <figure>
          {picture.media_type === 'image' ? (
            <Image
              src={picture.hdurl?.toString() ?? picture.url.toString()}
              width={1000}
              height={1000}
              alt={picture.title}
            />
          ) : (
            <video
              autoPlay={false}
              loop={true}
              width={1000}
              height={1000}
              src={picture.hdurl?.toString() ?? picture.url.toString()}
            />
          )}
        </figure>
        <div className='card-body collapse collapse-arrow'>
          <input type='checkbox' />
          <h2 className='min-h-0 py-0 text-sm card-title collapse-title'>
            {picture.title}
          </h2>

          <div className='collapse-content'>{picture.explanation}</div>

          <div className='justify-end card-actions'>
            <div className='italic badge badge-ghost'>{picture.date}</div>
          </div>
        </div>
      </div>
    </>
  )
}
