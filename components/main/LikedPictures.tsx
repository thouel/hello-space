'use client'
import { Picture } from '@/types'
import React from 'react'
import PictureCard from '../sub/PictureCard'
import { TbCameraQuestion } from 'react-icons/tb'
import Link from 'next/link'

type Props = {
  pictures: Picture[]
}

const LikedPictures = (props: Props) => {
  const { pictures } = props

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
