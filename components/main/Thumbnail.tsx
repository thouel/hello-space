import { Picture } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Thumbnail({ picture }: { picture: Picture }) {
  return (
    <>
      <div className=''>
        <figure>
          {
            picture.media_type === 'image' ? (
              <Link href={`/p/${picture.date}`}>
                <Image
                  src={picture.url?.toString()}
                  width={400}
                  height={400}
                  alt={picture.title}
                  className='p-1 mb-1 transition-opacity shadow-xl hover:opacity-50'
                />
              </Link>
            ) : null /*  (
            <video
              autoPlay={false}
              loop={true}
              width={400}
              height={400}
              src={picture.url.toString()}
            />
          ) */
          }
        </figure>
        {/* <div className='card-body collapse collapse-arrow'>
          <input type='checkbox' />
          <h2 className='min-h-0 py-0 text-sm sm:text-xl md:text-2xl card-title collapse-title'>
            {picture.title}
          </h2>

          <div className='collapse-content'>{picture.explanation}</div>

          <div className='justify-end card-actions'>
            <div className='italic badge badge-ghost'>{picture.date}</div>
          </div>
        </div> */}
      </div>
    </>
  )
}
