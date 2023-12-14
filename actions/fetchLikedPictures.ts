'use server'
import { Picture, PictureResult } from '@/types'
import { log } from '@logtail/next'
import prisma from '@/lib/db/db'

export const fetchLikedPictures = async (
  userId: string,
): Promise<Picture[]> => {
  log.debug(`fetchLikedPictures with userId=${userId}`)

  const pictures: Picture[] = await prisma.picture.findMany({
    select: {
      copyright: true,
      date: true,
      explanation: true,
      hdurl: true,
      url: true,
      media_type: true,
      service_version: true,
      title: true,
    },
    where: {
      userIDs: {
        has: userId,
      },
    },
  })

  // log.debug('fetchLikedPictures', { pictures })
  return pictures
}
