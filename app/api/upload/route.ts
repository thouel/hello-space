import prisma from '@/lib/db/db'
import { put, del } from '@vercel/blob'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import options from '../auth/[...nextauth]/options'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')
  const folder = searchParams.get('folder')
  const session = await getServerSession(options)
  const isAvatar = folder === 'avatar'
  const isBanner = folder === 'banner'
  const VERCEL_STORAGE_URL = 'blob.vercel-storage.com'

  if (!session || !session.user) {
    return NextResponse.redirect('/auth/login')
  }
  if (!session.user.name) {
    throw new Error('User in session has no name')
  }
  if (!request.body) {
    throw new Error('Cannot process this')
  }
  if (!folder) {
    throw new Error('No folder provided')
  }
  if (!filename) {
    throw new Error('No file provided')
  }

  let user = await prisma.user.findUniqueOrThrow({
    where: {
      name: session.user.name,
    },
  })

  // Remove the old one
  log.info(
    `Checking if removing the old one is necessary ? ${
      isAvatar ? user.image : user.bannerPicture
    }`,
  )
  if ((isAvatar && user.image) || (isBanner && user.bannerPicture)) {
    if (
      (isAvatar && user.image?.includes(VERCEL_STORAGE_URL)) ||
      (isBanner && user.bannerPicture?.includes(VERCEL_STORAGE_URL))
    ) {
      if (isAvatar && user.image) {
        await del(user.image)
        log.info(`Removed ${user.image}`)
      }
      if (isBanner && user.bannerPicture) {
        await del(user.bannerPicture)
        log.info(`Removed ${user.bannerPicture}`)
      }
    }
  }

  // Add the new one in storage
  const blob = await put(folder + '/' + filename, request.body, {
    access: 'public',
  })
  log.info(`Put ${blob.url}`)

  // Add the url to the user profile
  let data = {}
  if (isAvatar) {
    data = { image: blob.url }
  } else if (isBanner) {
    data = { bannerPicture: blob.url }
  }
  user = await prisma.user.update({
    where: {
      name: session.user.name,
    },
    data: {
      ...data,
    },
  })
  log.info(`Updated user`, { user })

  revalidatePath('/s/profile')
  return NextResponse.json(blob)
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const session = await getServerSession(options)
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  const folder = searchParams.get('folder')
  const isAvatar = folder === 'avatar'
  const isBanner = folder === 'banner'

  if (!session || !session.user) {
    return NextResponse.redirect('/auth/login')
  }
  if (!session.user.name) {
    throw new Error('User in session has no name')
  }
  if (!url) {
    throw new Error('No file provided')
  }

  // Remove from storage
  await del(url)

  // Remove from user
  let data = {}
  if (isAvatar) {
    data = { image: null }
  } else if (isBanner) {
    data = { bannerPicture: null }
  }
  const user = await prisma.user.update({
    where: {
      name: session?.user?.name,
    },
    data: {
      ...data,
    },
  })
  log.info(`Updated user`, { user })

  revalidatePath('/s/profile')
  return NextResponse.json({ message: 'OK' })
}
