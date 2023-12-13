import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type Props = {}

const BackToHome = (props: Props) => {
  return (
    <>
      <Link
        href={'/'}
        className='p-2 font-thin align-middle border border-gray-800 rounded-lg'
      >
        <HomeIcon className='w-8 h-8 cursor-pointer hover:text-white/50' />
      </Link>
    </>
  )
}

export default BackToHome
