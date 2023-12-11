import { Picture } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ThumbnailWithZoom({ picture }: { picture: Picture }) {
  return (
    <>
      <div className='inline-block overflow-hidden rounded-lg'>
        <figure>
          {picture.media_type === 'image' ? (
            <Link href={`/p/${picture.date}`}>
              <Image
                src={picture.url?.toString()}
                width={200}
                height={200}
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
