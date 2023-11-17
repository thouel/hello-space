import Link from 'next/link'
import React from 'react'

const AuthNav = () => {
  return (
    <div className='space-x-2'>
      <Link href='/auth/signin' className='btn btn-secondary btn-outline'>
        Sign in
      </Link>
      <Link href='/auth/signup' className='btn btn-primary'>
        Sign up
      </Link>
    </div>
  )
}

export default AuthNav
