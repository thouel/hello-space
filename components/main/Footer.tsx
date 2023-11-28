'use client'
import {
  EnvelopeIcon,
  CodeBracketIcon,
  BugAntIcon,
} from '@heroicons/react/24/outline'
import { log } from '@logtail/next'
import { useSession } from 'next-auth/react'

export default function Footer() {
  const { data: session } = useSession({ required: false })

  const logSession = () => {
    log.debug('session', session?.user)
  }

  return (
    <div className='flex flex-wrap items-center justify-between gap-3 p-3 text-sm font-normal border-t border-gray-200'>
      <span className='select-none'>&copy; 2023, Obit</span>
      <a
        target='_blank'
        href='mailto:t.houel@gmail.com'
        rel='noopener noreferrer'
        className='hover:text-orange-600'
      >
        <EnvelopeIcon
          className='hidden w-6 h-6 mr-2 sm:inline'
          title='Contact by mail'
        />
        Contact
      </a>
      <a
        target='_blank'
        rel='noreferrer'
        href='https://github.com/thouel/hello-space'
        className='hover:text-orange-600'
      >
        <CodeBracketIcon
          className='hidden w-6 h-6 mr-2 sm:inline'
          title='Go to repository'
        />
        Repo
      </a>
      <span
        onClick={() => logSession()}
        className='cursor-pointer hover:text-orange-600'
      >
        <BugAntIcon
          className='hidden w-6 h-6 mr-2 sm:inline'
          title='Log Session'
        />
        Log Session
      </span>
    </div>
  )
}
