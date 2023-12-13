import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {}

const PictureCardSkeleton = (props: Props) => {
  return (
    <>
      <Skeleton count={1} className='' height={'200px'} />
      <Skeleton count={1} className='my-4' height={'50px'} />
      <Skeleton count={4} className='' />
      <div className='flex flex-row justify-between'>
        <Skeleton count={1} className='w-1/3' />
        <Skeleton count={1} className='w-1/3' />
      </div>
    </>
  )
}

export default PictureCardSkeleton
