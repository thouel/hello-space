import { Picture } from '@/app/types'
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
        <div className='card-body'>
          <h2 className='card-title'>{picture.title}</h2>
          <div className='collapse collapse-arrow'>
            <input type='checkbox' />
            <div className='text-base font-medium collapse-title'>
              History crunch
            </div>
            <div className='collapse-content'>{picture.explanation}</div>
          </div>
          <div className='justify-end card-actions'>
            <div className='italic badge badge-ghost'>{picture.date}</div>
          </div>
        </div>
      </div>
    </>
  )
}
