import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(options)
  const user = session?.user

  // No need to reject user if session is null.
  // middleware is taking care of it earlier

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        {user.image ? (
          <Image
            src={user.image}
            width={96}
            height={96}
            alt='Profile picture'
            className='border-8 border-white'
          />
        ) : null}
        <h1>Welcome {user.name}</h1>
        <span>{user.email}</span>
      </div>
    </>
  )
}
