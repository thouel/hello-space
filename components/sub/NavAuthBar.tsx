import { styles } from '@/constants/styles'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { HeartIcon } from '@heroicons/react/24/outline'
import { IoPersonCircleOutline } from 'react-icons/io5'

type Props = {}

const NavAuthBar = (props: Props) => {
  const { data: session } = useSession({ required: false })
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='p-1'>
          <AvatarImage src={session.user.image} alt='PP' />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-1 font-normal bg-white rounded-lg shadow-xl w-52'>
        <DropdownMenuLabel className='px-2 py-1 font-semibold'>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='h-px my-1 -mx-1 bg-muted' />
        <DropdownMenuItem className='p-1 pl-3'>
          <Link href={'/s/liked'} className=''>
            <HeartIcon className='inline w-4 h-4 mr-2' />
            <span>Liked pictures</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-1 pl-3'>
          <Link href={'/s/profile'}>
            <IoPersonCircleOutline className='inline w-4 h-4 mr-2' />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className='h-px my-1 -mx-1 bg-muted' />
        <DropdownMenuItem className='p-1 pl-3'>
          <Link href={'/api/auth/signout'}>
            <AiOutlineLogout className='inline w-4 h-4 mr-2' />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavAuthBar
