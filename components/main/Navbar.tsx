'use client'
import React, { useEffect, useState } from 'react'
import ThemeButton from '../sub/ThemeButton'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Session } from 'next-auth'

const Navbar = ({ session }: { session: Session | null }) => {
  const [isVisible, setIsVisible] = useState(true)

  const toggleVisibility = () => {
    setIsVisible(window.scrollY < 50)
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      <div
        className={`${
          isVisible ? 'opacity-100' : 'opacity-0'
        } flex flex-row justify-between transition-opacity`}
      >
        <Link href={'/'}>
          <p className=''>
            <RocketLaunchIcon className='inline-block w-6 h-6' />
            <span className='ml-1 text-sm font-semibold align-middle'>
              Hello Space
            </span>
          </p>
        </Link>
        <div className='inline'>
          <span className=''>
            <ThemeButton />
          </span>
          <span className='ml-3 align-top'>
            <AuthPart session={session} />
          </span>
        </div>
      </div>
    </>
  )
}

const AuthPart = ({ session }: { session: Session | null }) => {
  return (
    <>
      <span className='text-sm font-semibold '>
        {!session?.user ? (
          <Link href={'/auth/login'}>Log in</Link>
        ) : (
          <Link href={'/api/auth/signout'}>Sign out</Link>
        )}
      </span>
    </>
  )
}

export default Navbar
