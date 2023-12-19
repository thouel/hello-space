'use client'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

type Props = {}

const BackHome = (props: Props) => {
  const router = useRouter()

  return (
    <>
      <a onClick={() => router.push('/')}>
        <ArrowLeftCircleIcon className='w-12 h-12 hover:cursor-pointer' />
      </a>
    </>
  )
}

export default BackHome
