import React from 'react'
import WidthContainer from '../sub/WidthContainer'
import Logo from '../sub/Logo'
import AuthNav from '../sub/AuthNav'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full navbar'>
      <WidthContainer>
        <div className='flex items-center justify-between w-full'>
          <Logo className='text-xl font-bold' />
          <AuthNav />
        </div>
      </WidthContainer>
    </div>
  )
}

export default Navbar
