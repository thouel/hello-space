'use client'
import { signIn } from 'next-auth/react'
import { RxDiscordLogo, RxGithubLogo } from 'react-icons/rx'
import { PiRedditLogo } from 'react-icons/pi'
import { log } from '@logtail/next'

const SignInProviders = ({ providers }: { providers: any }) => {
  log.warn('in SignInProviders > before providers check')
  if (!providers) {
    return null
  }

  const styles = {
    btn: 'w-full btn btn-primary',
    logo: 'w-6 h-6',
  }
  log.warn('in SignInProviders > before return')
  return (
    <>
      {providers.github ? (
        <button
          data-test='github'
          className={styles.btn}
          onClick={() => signIn('github')}
        >
          <RxGithubLogo className={styles.logo} />
          Sign in with GitHub
        </button>
      ) : null}
      {providers.discord ? (
        <button
          data-test='discord'
          className={styles.btn}
          onClick={() => signIn('discord')}
        >
          <RxDiscordLogo className={styles.logo} />
          Sign in with Discord
        </button>
      ) : null}

      {providers.reddit ? (
        <button
          data-test='reddit'
          className={styles.btn}
          onClick={() => signIn('reddit')}
        >
          <PiRedditLogo className={styles.logo} />
          Sign in with Reddit
        </button>
      ) : null}
    </>
  )
}

export default SignInProviders
