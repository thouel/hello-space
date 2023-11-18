'use client'

import { strToDate } from '@/lib/ui-helper'
import PictureOfTheDay from './PictureOfTheDay'
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
          .map((p) => <PictureOfTheDay key={p.date} picture={p} />)
      ) : (
        <div className='text-xl font-bold'>No pictures available !!</div>
      )}
    </>
  )
}
