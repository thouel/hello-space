'use client'
import { Picture } from '@/types'
import { HandThumbDownIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline'
import { updateLikes } from '@/actions/updateLikes'
import { useRouter } from 'next/navigation'

type Props = {
  picture: Picture
}

const PictureCardActions = (props: Props) => {
  const router = useRouter()
  const removeLike = async (picture: Picture) => {
    await updateLikes(picture, true)
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
      <div
        className='flex-1 btn btn-primary'
        onClick={() => removeLike(props.picture)}
      >
        <HandThumbDownIcon className='inline w-6 h-6' />
        Remove
      </div>
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
