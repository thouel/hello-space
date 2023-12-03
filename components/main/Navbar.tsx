'use client'
import React, { useEffect, useState } from 'react'
import ThemeButton from '../sub/ThemeButton'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Session } from 'next-auth'
import { styles } from '@/constants/styles'
import NavAuthBar from '../sub/NavAuthBar'

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
        } flex flex-row justify-between transition-opacity min-h-[40px] h-[40px] text-sm font-semibold bg-white dark:bg-[#6800FF]`}
      >
        <Link href={'/'} className='mt-1'>
          <p className={styles.clickEffect}>
            <RocketLaunchIcon className='inline-block w-6 h-6' />
            <span className='ml-1'>Hello Space</span>
          </p>
        </Link>
        <div className='flex flex-row gap-2'>
          {session?.user ? null : <ThemeButton />}
          <NavAuthBar session={session} />
        </div>
      </div>
    </>
  )
}

export default Navbar
