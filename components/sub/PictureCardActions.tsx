'use client'
import { Picture } from '@/types'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline'
import { updateLikes } from '@/actions/updateLikes'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { useEffect, useState } from 'react'

type Props = {
  picture: Picture
}

const PictureCardActions = (props: Props) => {
  const { data: session, update } = useSession({ required: false })
  const [isLiked, setIsLiked] = useState<boolean>()

  const updateLike = async (picture: Picture, isLiked: boolean | undefined) => {
    if (!session || isLiked === undefined) {
      return
    }

    // Update likes in DB
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

  const moreFromArtist = (picture: Picture) => {
    const searchParams = new URLSearchParams()
    searchParams.set('t', 'images')
    searchParams.set('q', `space + ${picture.copyright}`)
    const url = 'https://qwant.com'

    window.open(`${url}?${searchParams.toString()}`, '_blank')
  }

  useEffect(() => {
    function initializeIsLiked() {
      setIsLiked(session?.user.likes.includes(props.picture.date))
    }
    initializeIsLiked()
  }, [session?.user.likes, props.picture.date])

  return (
    <>
      <div className='flex flex-row justify-between w-full gap-2'>
        {session &&
          (!isLiked ? (
            <Button
              variant='default'
              onClick={() => updateLike(props.picture, isLiked)}
            >
              <HandThumbUpIcon className='inline w-6 h-6 mr-1' />
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                  <HandThumbDownIcon className='inline w-6 h-6 mr-1' />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to remove this one from your
                    favourites?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    No worries ! You will be able to find it later.
                    <br />
                    Perhaps..
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => updateLike(props.picture, isLiked)}
                  >
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
        <Button
          className='flex-1 grow'
          variant='outline'
          onClick={() => moreFromArtist(props.picture)}
        >
          <EllipsisHorizontalCircleIcon className='inline w-6 h-6 mr-1' />
          <span className=''>More from this artist</span>
        </Button>
      </div>
    </>
  )
}

export default PictureCardActions
