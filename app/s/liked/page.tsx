import { fetchLikedPictures } from '@/actions/fetchLikedPictures'
import options from '@/app/api/auth/[...nextauth]/options'
import LikedPictures from '@/components/main/LikedPictures'
import BackButton from '@/components/sub/BackButton'
import BackToTopButton from '@/components/sub/BackToTopButton'
import Title from '@/components/sub/Title'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const LikedPage = async (props: Props) => {
  const session = await getServerSession(options)
  const pictures = await fetchLikedPictures(session?.user.likes)

  return (
    <>
      <Title />
      <BackButton />
      <LikedPictures pictures={pictures} />
      <BackToTopButton />
    </>
  )
}

export default LikedPage
