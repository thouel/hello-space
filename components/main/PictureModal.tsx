'use client'
import { Picture } from '@/types'
import PictureCard from '../sub/PictureCard'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PictureModal({ picture }: { picture: Picture }) {
  const router = useRouter()

  // push the router one step back
  // and remove the close event listener
  const onCloseDialog = useCallback(() => {
    router.back()
    const dialog = document.getElementById('mmodal')
    if (dialog instanceof HTMLDialogElement) {
      dialog.removeEventListener('close', onCloseDialog)
    }
  }, [router])

  // Open the modal when component is mounted
  // and bind the 'close' event
  useEffect(() => {
    // Get the modal element
    const dialog = document.getElementById('mmodal')
    if (!(dialog instanceof HTMLDialogElement)) {
      throw new Error('Dialog not found')
    }
    dialog.showModal()

    // Listen for the close event
    dialog.addEventListener('close', onCloseDialog)
  }, [onCloseDialog])

  return (
    <>
      <div className=''>
        <dialog id='mmodal' className='modal bg-black/50 '>
          <div className='max-w-full p-1 modal-box bg-base-200 dark:bg-black/95 dark:text-white/90'>
            <form method='dialog'>
              <button
                className='absolute btn btn-sm btn-circle btn-ghost right-1 top-1'
                style={{ zIndex: 10 }}
              >
                ✕
              </button>
            </form>
            <PictureCard picture={picture} />
          </div>
        </dialog>
      </div>
    </>
  )
}
