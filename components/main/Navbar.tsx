import React from 'react'
import ThemeButton from '../sub/ThemeButton'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { auth } from '@/auth'
import PrintSession from '../sub/PrintSession'
import { Session } from 'next-auth'

const Navbar = async () => {
  const session = await auth()
  return (
    <>
      <div className='flex flex-row justify-between py-5 mx-5'>
        <Link href={'/'}>
          <p className='p-2'>
            <RocketLaunchIcon className='inline-block w-10 h-10' />
            <span className='ml-3 text-2xl font-semibold align-middle'>
              Hello Space
            </span>
          </p>
        </Link>
        <PrintSession />

        <div className='flex flex-row justify-between'>
          <ThemeButton />
          <AuthPart session={session} />
        </div>
      </div>
    </>
  )
}

const AuthPart = ({ session }: { session: Session | null }) => {
  return (
    <>
      <p className='p-2 mt-1 ml-3 text-xl font-semibold'>
        {!session?.user ? (
          <>
            <Link href={'/api/auth/signin'}>Sign in</Link>
            &nbsp;|&nbsp;
            <Link href={'/auth/signup'}>Sign up</Link>
          </>
        ) : (
          <Link href={'/api/auth/signout'}>Sign out</Link>
        )}
      </p>
    </>
  )
}

export default Navbar
