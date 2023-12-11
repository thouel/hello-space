'use client'
import { Picture } from '@/types'
import {
  HandThumbUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { log } from '@logtail/next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Thumbnail({ picture }: { picture: Picture }) {
  const router = useRouter()
  const [overlayVisible, setOverlayVisible] = useState(false)

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible)
  }

  const like = () => {
    log.info('like', { picture })
  }

  const details = () => {
    router.push(`/p/${picture.date}`)
  }

  return (
    <>
      <div
        className='relative cursor-pointer'
        onClick={() => toggleOverlay()}
        id='image-container'
      >
        <Image
          src={picture.url?.toString()}
          width={200}
          height={200}
          alt={picture.title}
          id='overlay-image'
          className='w-full h-auto mb-1 rounded-lg shadow-xl'
        />
        {overlayVisible && (
          <div
            className='absolute top-0 flex items-center justify-center w-full h-full text-white rounded-lg bg-black/50'
            id='overlay'
          >
            <div className='flex gap-12 justify-evenly' id='overlay-content'>
              <span onClick={() => like()}>
                <HandThumbUpIcon className='w-8 h-8' />
              </span>
              <span onClick={() => details()}>
                <InformationCircleIcon className='w-8 h-8' />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
