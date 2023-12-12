'use client'
import { updateLikes } from '@/actions/updateLikes'
import { Picture } from '@/types'
import {
  HandThumbUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { HandThumbUpIcon as HandThumbUpIconSolid } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent, useEffect, useState } from 'react'

export default function Thumbnail({ picture }: { picture: Picture }) {
  const { update, data: session } = useSession({ required: false })
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    function initializeIsLiked() {
      setIsLiked(session?.user.likes.includes(picture.date))
    }
    initializeIsLiked()
  }, [session?.user.likes, picture.date])

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible)
  }

  const like = async (e: MouseEvent) => {
    if (!session || !session.user) {
      return null
    }

    // Do not close overlay
    e.stopPropagation()

    // Perform the server action
    await updateLikes(picture, isLiked)

    // Update session
    update({
      type: 'likes',
      likes: isLiked
        ? session.user.likes.filter((l: string) => l !== picture.date)
        : [...session.user.likes, picture.date],
    })

    // Update state
    setIsLiked(!isLiked)
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
              {session?.user && (
                <span onClick={(e) => like(e)}>
                  {isLiked ? (
                    <HandThumbUpIconSolid className='w-8 h-8' />
                  ) : (
                    <HandThumbUpIcon className='w-8 h-8' />
                  )}
                </span>
              )}
              <span>
                <Link href={`/p/${picture.date}`}>
                  <InformationCircleIcon className='w-8 h-8' />
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
