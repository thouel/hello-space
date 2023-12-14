'use client'
import { Picture } from '@/types'
import { HandThumbDownIcon } from '@heroicons/react/24/solid'
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

type Props = {
  picture: Picture
}

const PictureCardActions = (props: Props) => {
  const { data: session, update } = useSession({ required: false })

  const removeLike = async (picture: Picture) => {
    // Update likes in DB
    await updateLikes(picture, true)

    // Update session
    update({
      type: 'likes',
      likes: session?.user.likes.filter((l: string) => l !== picture.date),
    })
  }

  const moreFromArtist = (picture: Picture) => {
    const searchParams = new URLSearchParams()
    searchParams.set('t', 'images')
    searchParams.set('q', `space + ${picture.copyright}`)
    const url = 'https://qwant.com'

    window.open(`${url}?${searchParams.toString()}`, '_blank')
  }

  return (
    <>
      <div className='flex flex-row justify-between w-full gap-2'>
        {session && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <HandThumbDownIcon className='inline w-6 h-6 mr-1' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to remove this one from your favourites?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  No worries ! You will be able to find it later.
                  <br />
                  Perhaps..
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction onClick={() => removeLike(props.picture)}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
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
