import React from 'react'
import ThemeButton from '../sub/ThemeButton'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  return (
    <>
      <div className='flex flex-row justify-between py-5 mx-5'>
        <p className='p-2 rounded-lg bg-black/5'>
          <RocketLaunchIcon className='inline-block w-10 h-10' />
          <span className='ml-3 text-2xl font-semibold align-middle'>
            Hello Space
          </span>
        </p>

        <ThemeButton />
      </div>
    </>
  )
}

export default Navbar