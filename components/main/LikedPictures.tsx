'use client'
import { Picture } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import PictureCard from '../sub/PictureCard'
import { TbCameraQuestion } from 'react-icons/tb'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { strToDate } from '@/lib/ui-helper'
import { log } from '@logtail/next'

type Props = {
  likedPictures: Picture[]
}

const LikedPictures = (props: Props) => {
  const [pictures, setPictures] = useState<Picture[] | null>()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort')
  const router = useRouter()

  const preparePictures = useCallback(() => {
    if (!props.likedPictures) {
      return null
    }

    const copy: Picture[] = [...props.likedPictures]

    if (!sort) {
      return copy
    }

    if (sort === 'p-desc') {
      copy.sort(
        (a, b) => strToDate(b.date).getTime() - strToDate(a.date).getTime(),
      )
    } else if (sort === 'p-asc') {
      copy.sort(
        (b, a) => strToDate(b.date).getTime() - strToDate(a.date).getTime(),
      )
    } else if (sort === 'a-desc') {
      copy.reverse()
    } else if (sort === 'a-asc') {
      //Nothing to do here, the array already arrives in that order
    }

    log.info('props', { likedPictures: props.likedPictures })
    log.info('copy', { copy })
    return copy
  }, [props, sort])

  useEffect(() => {
    setPictures(preparePictures())
  }, [preparePictures, router])

  return (
    <>
      {pictures ? (
        <>
          <div className='my-4 mb-12'>
            {pictures.map((p) => (
              <div key={p.date} className='mb-2'>
                <PictureCard picture={p} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className='flex items-center p-4 my-4 bg-white rounded-lg justify-evenly'>
          <Link href={'/'}>
            <TbCameraQuestion className='inline w-8 h-8 mr-2' />
            <span className='font-semibold'>Nothing here</span>
          </Link>
        </div>
      )}
    </>
  )
}

export default LikedPictures
