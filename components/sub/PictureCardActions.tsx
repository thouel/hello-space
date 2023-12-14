'use client'
import { Picture } from '@/types'
import { HandThumbDownIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline'
import { updateLikes } from '@/actions/updateLikes'
import { useSession } from 'next-auth/react'

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
    <div className='flex flex-row justify-between w-full gap-2 mb-2'>
      {session && (
        <div
          className='flex-1 btn btn-primary'
          onClick={() => removeLike(props.picture)}
        >
          <HandThumbDownIcon className='inline w-6 h-6' />
          Remove
        </div>
      )}
      <div
        className='flex-1 btn btn-outline'
        onClick={() => moreFromArtist(props.picture)}
      >
        <EllipsisHorizontalCircleIcon className='inline w-6 h-6' />+ from Artist
      </div>
    </div>
  )
}

export default PictureCardActions
