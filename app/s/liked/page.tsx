import { fetchLikedPictures } from '@/actions/fetchLikedPictures'
import options from '@/app/api/auth/[...nextauth]/options'
import LikedPictures from '@/components/main/LikedPictures'
import BackButton from '@/components/sub/BackButton'
import BackHome from '@/components/sub/BackHome'
import BackToTopButton from '@/components/sub/BackToTopButton'
import SortPictures from '@/components/sub/SortPictures'
import Title from '@/components/sub/Title'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const LikedPage = async (props: Props) => {
  const session = await getServerSession(options)
  const pictures = await fetchLikedPictures(session?.user.id)

  return (
    <>
      <Title />
      <div className='flex flex-row justify-between gap-2'>
        <BackButton />
        <SortPictures />
      </div>
      <LikedPictures likedPictures={pictures} />
      <BackToTopButton />
    </>
  )
}

export default LikedPage
