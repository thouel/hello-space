'use client'
import { strToDate } from '@/lib/ui-helper'
import { Picture } from '@/types'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Thumbnail from '../sub/Thumbnail'
import { fetchPictures } from '@/actions/fetchPictures'
import { Spinner } from '../sub/Spinner'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'

export interface InfinitePicturesProps {
  initialPictures: Picture[]
}
const InfinitePictures = (props: InfinitePicturesProps) => {
  const [pictures, setPictures] = useState<Picture[]>(props.initialPictures)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const isLoading = useRef(false)
  const [autoRefresh, setAutoRefresh] = useState<boolean>()
  const { data: session } = useSession({ required: false })

  const loadMorePictures = async () => {
    isLoading.current = true
    const id = toast.info(`Loading page ${page + 1}`, {
      hideProgressBar: true,
      delay: 0,
    })
    const next = page + 1
    const newPictures = await fetchPictures(next)
    if (!newPictures.isError) {
      setPictures((prevPictures: Picture[]) => [
        ...prevPictures,
        ...newPictures.data,
      ])
      setPage(next)
      toast.success(`Loaded page ${page + 1}`, {
        hideProgressBar: true,
        delay: 2000,
      })
    } else {
      toast.error('Error while loading new pictures')
    }
    toast.dismiss(id)
    isLoading.current = false
  }

  const preparePictures = () => {
    return pictures
      .sort((a, b) => strToDate(b.date).getTime() - strToDate(a.date).getTime())
      .filter((pi) => pi.media_type === 'image')
  }

  useEffect(() => {
    setAutoRefresh(localStorage.getItem('autoRefresh') === 'true')
  }, [])

  useEffect(() => {
    if (autoRefresh && inView && !isLoading.current) {
      loadMorePictures()
    }
  })

  return (
    <>
      <div className='flex flex-row items-center justify-end mb-2 space-x-2'>
        <Switch
          id='autoRefresh'
          checked={autoRefresh}
          onCheckedChange={() => {
            // we set it at the opposite value because react is going to change it after
            localStorage.setItem('autoRefresh', autoRefresh ? 'false' : 'true')
            setAutoRefresh(!autoRefresh)
          }}
        />
        <Label htmlFor='autoRefresh' className='cursor-pointer'>
          Infinite scroll
        </Label>
      </div>
      <div className='columns-2 gap-x-1'>
        {pictures ? (
          preparePictures().map((p) => <Thumbnail key={p.title} picture={p} />)
        ) : (
          <div className='text-xl font-bold'>No pictures available !!</div>
        )}
      </div>
      {autoRefresh && (
        <div className='flex items-center justify-center w-full p-4' ref={ref}>
          <Spinner />
        </div>
      )}
    </>
  )
}

export default InfinitePictures
