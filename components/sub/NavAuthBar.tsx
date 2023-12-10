import { styles } from '@/constants/styles'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import ThemeMenuItem from './ThemeMenuItem'
import options from '@/app/api/auth/[...nextauth]/options'
import { useSession } from 'next-auth/react'

const NavAuthBar = () => {
  const { data: session } = useSession(options)
  if (!session?.user) {
    return (
      <>
        <Link href={'/auth/login'} className='mt-1'>
          <p className={styles.clickEffect}>
            <AiOutlineLogin className='inline-block w-6 h-6' />
            <span className='ml-1'>Log in</span>
          </p>
        </Link>
      </>
    )
  }

  return (
    <>
      <div className='mt-[2px] dropdown dropdown-end '>
        <div
          tabIndex={0}
          role='button'
          className='h-8 btn-ghost btn-circle avatar'
        >
          <div className='w-8 h-8 rounded-full'>
            {session.user.image ? (
              <Image alt='PP' src={session.user.image} width={24} height={24} />
            ) : (
              'PP'
            )}
          </div>
        </div>
        <ul className='mt-1 z-[1] p-1 shadow menu menu-sm dropdown-content bg-gray-50 dark:bg-gray-800 rounded-box w-52'>
          <li>
            <Link href={'/s/profile'}>
              <p className={styles.clickEffect}>
                <CgProfile className='inline-block w-4 h-4' />
                <span className='ml-1'>Profile</span>
              </p>
            </Link>
          </li>
          <li>
            <a>
              <ThemeMenuItem />
            </a>
          </li>
          <li>
            <a className='my-1 divider'></a>
          </li>
          <li>
            <Link href={'/api/auth/signout'}>
              <p className={styles.clickEffect}>
                <AiOutlineLogout className='inline-block w-4 h-4' />
                <span className='ml-1'>Log out</span>
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavAuthBar
