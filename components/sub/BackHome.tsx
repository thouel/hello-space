import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {}

const BackHome = (props: Props) => {
  return (
    <>
      <Button asChild variant='outline'>
        <Link href={'/'} className=''>
          <HomeIcon className='w-8 h-8 cursor-pointer' />
        </Link>
      </Button>
    </>
  )
}

export default BackHome
