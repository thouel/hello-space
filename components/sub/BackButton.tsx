'use client'

import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()
  return (
    <a onClick={() => router.back()}>
      <ArrowLeftCircleIcon className='w-12 h-12 cursor-pointer text-base-300 hover:text-black/50' />
    </a>
  )
}

export default BackButton
