'use client'
import { Picture } from '@/types'
import { fetchPictures } from '@/actions/fetchPictures'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import Pictures from '../main/Pictures'
import { Spinner } from './Spinner'

const LoadMore = () => {
  const [pictures, setPictures] = useState<Picture[]>([])
  const [page, setPage] = useState(1)

  const { ref, inView } = useInView()

  const isLoadingRef = useRef(false)

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const loadMorePictures = async () => {
    isLoadingRef.current = true
    toast.info('Loading pictures ...')

    await delay(2000)

    const nextPage = page + 1

    const { isError, message, data } = await fetchPictures(nextPage)
    if (isError) {
      toast.error(message)
      return
    }

    setPictures((prevPictures: Picture[]) => [...prevPictures, ...data])
    setPage(nextPage)
    isLoadingRef.current = false
  }

  useEffect(() => {
    if (inView && !isLoadingRef.current) {
      loadMorePictures()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <>
      <Pictures pictures={pictures} />
      <div
        className='flex items-center justify-center col-span-1 p-4'
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  )
}

export default LoadMore
