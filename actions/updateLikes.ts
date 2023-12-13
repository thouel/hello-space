'use server'

import options from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/lib/db/db'
import { Picture } from '@/types'
import { log } from '@logtail/next'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const updateLikes = async (
  picture: Picture,
  isCurrentlyLiked: boolean,
) => {
  const session = await getServerSession(options)

  if (!session || !session.user) {
    log.error('You need to be signed in before performing this action')
    return
  }

  if (isCurrentlyLiked) {
    // Picture is currently liked
    // We need to remove it from DB
    await prisma.user.update({
      where: { name: session.user.name },
      data: {
        picturesLiked: {
          disconnect: [{ date: picture.date }],
        },
      },
    })

    log.info(
      `Removed connection between ${session.user.name} and picture ${picture.date}`,
    )
  } else {
    // Picture is currently not liked
    // We need to add it in DB
    await prisma.picture.upsert({
      where: { date: picture.date },
      create: {
        copyright: picture.copyright ?? '',
        date: picture.date,
        explanation: picture.explanation,
        hdurl: picture.hdurl?.toString(),
        media_type: picture.media_type,
        service_version: picture.service_version,
        title: picture.title,
        url: picture.url?.toString(),
        likes: {
          connect: { name: session.user.name },
        },
      },
      update: {
        likes: {
          connect: { name: session.user.name },
        },
      },
    })
    log.info(
      `Added connection between ${session.user.name} and picture ${picture.date}`,
    )
  }

  revalidatePath('/s/liked')

  return
}
