import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Picture } from '@/types'
import Image from 'next/image'
import { displayDate } from '@/lib/ui-helper'
import { Badge } from '../ui/badge'
import PictureCardActions from './PictureCardActions'

type PictureCardProps = { picture: Picture }

const PictureCard = (props: PictureCardProps) => {
  const { picture } = props
  return (
    <Card className='overflow-hidden shadow-2xl rounded-xl'>
      <CardHeader className='p-0 m-0'>
        <CardTitle>
          {picture.media_type === 'image' ? (
            <Image
              src={picture.hdurl?.toString() ?? picture.url.toString()}
              width={1080}
              height={720}
              alt={picture.title}
              className=''
            />
          ) : null}
          <p className='m-2'>{picture.title}</p>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-2 text-sm text-justify'>{picture.explanation}</div>
        <div className='flex flex-row justify-between text-xs sm:text-sm md:text-base'>
          <Badge className='w-3/5' variant='secondary'>
            &copy; {picture.copyright}
          </Badge>
          <Badge variant='secondary'>{displayDate(picture.date)}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <PictureCardActions picture={picture} />
      </CardFooter>
    </Card>
  )
}

export default PictureCard
