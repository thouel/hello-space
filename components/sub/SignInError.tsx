'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Errors = {
  Configuration: 'Configuration problem',
  AccessDenied: 'Access denied',
  Verification: 'Magic link expired or already used',
  OAuthSignin: 'Error while signing in with OAuth',
  OAuthCallback: 'Error while OAuth callback',
  OAuthCreateAccount: 'Error while OAuth account creation',
  EmailCreateAccount: 'Failed to send email with magic link',
  Callback: 'Error while callback',
  OAuthAccountNotLinked: 'Account already linked with another OAuth provider',
  EmailSignin: 'Failed to send email with magic link',
  CredentialsSignin: 'Credentials login failed',
  SessionRequired: 'Log in first please',
  Default: 'Something bad happened',
}

export default function SignInError() {
  const error = useSearchParams().get('error')

  useEffect(() => {
    if (!error) {
      return
    }
    const idx = Object.keys(Errors).indexOf(error)
    const errorMessage = Object.values(Errors).at(idx)

    if (errorMessage != '') {
      toast.error(errorMessage)
    }
  })

  return <></>
}
