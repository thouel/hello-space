import { Picture } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Thumbnail({ picture }: { picture: Picture }) {
  return (
    <>
      <div className='inline-block overflow-hidden rounded-lg'>
        <figure>
          {picture.media_type === 'image' ? (
            <Link href={`/p/${picture.date}`}>
              <Image
                src={picture.url?.toString()}
                width={400}
                height={400}
                alt={picture.title}
                className='transition-transform duration-500 shadow-xl hover:scale-125'
              />
            </Link>
          ) : null}
        </figure>
      </div>
    </>
  )
}
