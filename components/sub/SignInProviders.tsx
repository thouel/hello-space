'use client'
import { signIn } from 'next-auth/react'
import { RxDiscordLogo, RxGithubLogo } from 'react-icons/rx'
import { PiRedditLogo } from 'react-icons/pi'
import { log } from '@logtail/next'
import { Button } from '../ui/button'

const SignInProviders = ({ providers }: { providers: any }) => {
  if (!providers) {
    return null
  }

  const styles = {
    logo: 'w-6 h-6 mr-2',
  }
  return (
    <>
      {providers.github ? (
        <Button onClick={() => signIn('github')} data-test='github'>
          <RxGithubLogo className={styles.logo} />
          Sign in with GitHub
        </Button>
      ) : null}
      {providers.discord ? (
        <Button data-test='discord' onClick={() => signIn('discord')}>
          <RxDiscordLogo className={styles.logo} />
          Sign in with Discord
        </Button>
      ) : null}

      {providers.reddit ? (
        <Button data-test='reddit' onClick={() => signIn('reddit')}>
          <PiRedditLogo className={styles.logo} />
          Sign in with Reddit
        </Button>
      ) : null}
    </>
  )
}

export default SignInProviders
