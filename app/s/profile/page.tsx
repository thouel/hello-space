import options from '@/app/api/auth/[...nextauth]/options'
import Avatar from '@/components/sub/Avatar'
import BackButton from '@/components/sub/BackButton'
import Banner from '@/components/sub/Banner'
import prisma from '@/lib/db/db'
import { log } from '@logtail/next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(options)
  const sessionUser = session?.user

  // No need to reject user if session is null.
  // middleware is taking care of it earlier

  if (!sessionUser) {
    redirect('/')
  }

  log.info('session user', { sessionUser })

  const user = await prisma.user.findUniqueOrThrow({
    where: { name: sessionUser.name ?? '' },
    include: {
      accounts: {},
    },
  })
  log.info('found user', { user })

  return (
    <>
      <div className='flex flex-col gap-4'>
        <BackButton />
        <Banner banner={user?.bannerPicture} />
        <div className='flex flex-row gap-4'>
          <Avatar image={sessionUser.image} />
          <div>
            <h1>Welcome {sessionUser.name}</h1>
            <p>{sessionUser.email}</p>
          </div>
        </div>
      </div>
    </>
  )
}
