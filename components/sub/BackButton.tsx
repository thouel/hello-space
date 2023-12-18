'use client'

import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { log } from '@logtail/next'
import { useRouter, useSearchParams } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromLogin = searchParams.get('fromLogin')

  const goBack = () => {
    log.info('fromLogin', { fromLogin })
    if (fromLogin === '1') {
      router.push('/')
    }
    router.back()
  }

  return (
    <a onClick={() => goBack()}>
      <ArrowLeftCircleIcon className='w-12 h-12 hover:cursor-pointer' />
    </a>
  )
}

export default BackButton
