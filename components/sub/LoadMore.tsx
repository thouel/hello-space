'use client'
import { Picture } from '@/types'
import { fetchPictures } from '@/actions/ui-fetcher'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import Pictures from '../main/Pictures'
import { Spinner } from './Spinner'

const LoadMore = () => {
  const [pictures, setPictures] = useState<Picture[]>([])
  const [page, setPage] = useState(1)

  const { ref, inView } = useInView()

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const loadMorePictures = async () => {
    toast.info('Loading pictures ...')

    await delay(2000)

    const nextPage = page + 1

    const newPictures = (await fetchPictures(nextPage)) ?? []
    if (newPictures.error.message != '') {
      toast.error(newPictures.error.message)
      return
    }

    setPictures((prevPictures: Picture[]) => [
      ...prevPictures,
      ...newPictures.data,
    ])
    setPage(nextPage)
  }

  useEffect(() => {
    if (inView) {
      loadMorePictures()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <>
      <Pictures pictures={pictures} />
      <div
        className='flex items-center justify-center col-span-1 p-4 sm:col-span-2 md:col-span-3'
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  )
}

export default LoadMore
