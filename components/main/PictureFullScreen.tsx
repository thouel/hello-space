import { Picture } from '@/types'
import BackButton from '../sub/BackButton'
import PictureCard from '../sub/PictureCard'

export default function PictureFullScreen({ picture }: { picture: Picture }) {
  return (
    <>
      <div className='m-4'>
        <BackButton />
        <PictureCard picture={picture} />
      </div>
    </>
  )
}
