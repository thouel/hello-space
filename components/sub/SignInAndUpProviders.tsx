'use client'
import { signIn } from 'next-auth/react'
import { RxGithubLogo } from 'react-icons/rx'

const SignInAndUpProviders = ({
  providers,
  type,
}: {
  providers: any
  type: string
}) => {
  if (!providers) {
    return null
  }
  return (
    <>
      {providers.github ? (
        <button
          className='w-full btn btn-primary'
          onClick={() => signIn('github')}
        >
          <RxGithubLogo className='w-6 h-6' />
          Sign {type === 'signin' ? 'in' : 'up'} with GitHub
        </button>
      ) : null}
    </>
  )
}

export default SignInAndUpProviders
