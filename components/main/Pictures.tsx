'use client'

import { strToDate } from '@/lib/ui-helper'
import Thumbnail from './Thumbnail'
import { Picture } from '@/types'

export interface PicturesProps {
  pictures: Picture[] | null
}

export default function Pictures({ pictures }: PicturesProps) {
  return (
    <>
      {pictures ? (
        pictures
          .sort(
            (a, b) => strToDate(b.date).getTime() - strToDate(a.date).getTime(),
          )
          .map((p) => <Thumbnail key={p.title} picture={p} />)
      ) : (
        <div className='text-xl font-bold'>No pictures available !!</div>
      )}
    </>
  )
}
