'use client'
import { Picture } from '@/types'
import PictureCard from '../sub/PictureCard'
import { useEffect } from 'react'

export default function PictureModal({ picture }: { picture: Picture }) {
  useEffect(() => {
    document.getElementById('mmodal').showModal()
  }, [])
  return (
    <>
      <div className='m-4'>
        <dialog id='mmodal' className='modal'>
          <div className='max-w-full modal-box'>
            <PictureCard picture={picture} />
            <div className='modal-action'>
              <form method='dialog'>
                <button className='btn'>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  )
}
