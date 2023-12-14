import { Picture } from '@/types'
import BackButton from '../sub/BackButton'
import PictureCard from '../sub/PictureCard'

export default function PictureFullScreen({ picture }: { picture: Picture }) {
  return (
    <>
      <BackButton />
      <PictureCard picture={picture} />
    </>
  )
}
