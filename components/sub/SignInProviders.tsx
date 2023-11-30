'use client'
import { signIn } from 'next-auth/react'
import { RxDiscordLogo, RxGithubLogo } from 'react-icons/rx'
import { PiRedditLogo } from 'react-icons/pi'

const SignInProviders = ({ providers }: { providers: any }) => {
  if (!providers) {
    return null
  }

  const styles = {
    btn: 'w-full btn btn-primary',
    logo: 'w-6 h-6',
  }

  return (
    <>
      {providers.github ? (
        <button className={styles.btn} onClick={() => signIn('github')}>
          <RxGithubLogo className={styles.logo} />
          Sign in with GitHub
        </button>
      ) : null}
      {providers.discord ? (
        <button className={styles.btn} onClick={() => signIn('discord')}>
          <RxDiscordLogo className={styles.logo} />
          Sign in with Discord
        </button>
      ) : null}

      {providers.reddit ? (
        <button className={styles.btn} onClick={() => signIn('reddit')}>
          <PiRedditLogo className={styles.logo} />
          Sign in with Reddit
        </button>
      ) : null}
    </>
  )
}

export default SignInProviders
