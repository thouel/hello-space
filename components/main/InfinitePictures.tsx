'use client'
import { strToDate } from '@/lib/ui-helper'
import { Picture } from '@/types'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Thumbnail from '../sub/Thumbnail'
import { fetchPictures } from '@/actions/fetchPictures'
import { Spinner } from '../sub/Spinner'

export interface InfinitePicturesProps {
  initialPictures: Picture[]
}
const InfinitePictures = (props: InfinitePicturesProps) => {
  const [pictures, setPictures] = useState<Picture[]>(props.initialPictures)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  const loadMorePictures = async () => {
    const next = page + 1
    const newPictures = await fetchPictures(next)
    if (!newPictures.isError) {
      setPictures((prevPictures: Picture[]) => [
        ...prevPictures,
        ...newPictures.data,
      ])
      setPage(next)
    }
  }

  useEffect(() => {
    if (inView) {
      loadMorePictures()
    }
  })

  return (
    <>
      <div className='sm:columns-3 md:columns-4 lg:columns-5 columns-2 gap-x-1'>
        {pictures ? (
          pictures
            .sort(
              (a, b) =>
                strToDate(b.date).getTime() - strToDate(a.date).getTime(),
            )
            .map((p) => <Thumbnail key={p.title} picture={p} />)
        ) : (
          <div className='text-xl font-bold'>No pictures available !!</div>
        )}
      </div>
      <div className='flex items-center justify-center w-full p-4' ref={ref}>
        <Spinner />
      </div>
    </>
  )
}

export default InfinitePictures
