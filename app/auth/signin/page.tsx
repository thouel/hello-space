import Redirect from '@/components/main/Redirect'
import Signin from '@/components/main/Signin'
import React from 'react'

const SigninPage = () => {
  return (
    <div className='shadow-xl card card-bordered w-96'>
      <div className='space-y-3 card-body'>
        <div className='text-2xl card-title'>Sign in</div>
        <Signin />
        <Redirect
          url='/auth/signup'
          text='Dont have an account?'
          button='Sign up'
        />
      </div>
    </div>
  )
}

export default SigninPage
