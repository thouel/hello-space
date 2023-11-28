'use client'
import { log } from '@logtail/next'
import { useSession } from 'next-auth/react'
import React from 'react'

const PrintSession = () => {
  const { data: session } = useSession()
  const printSession = () => {
    if (session?.user) {
      log.debug('session = ', session.user)
    } else {
      log.debug('session is null')
    }
  }

  return (
    <>
      <button className='ml-2 text-xs' onClick={() => printSession()}>
        Print session
      </button>
    </>
  )
}

export default PrintSession
