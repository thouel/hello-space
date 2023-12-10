'use client'
import { PutBlobResult } from '@vercel/blob'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { FiUploadCloud } from 'react-icons/fi'
import { Spinner } from './Spinner'
import { TiDocumentDelete } from 'react-icons/ti'
import { log } from '@logtail/next'
import { UseSessionOptions, useSession } from 'next-auth/react'
import options from '@/app/api/auth/[...nextauth]/options'

const Avatar = ({
  image: initialImage,
}: {
  image: string | null | undefined
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState(initialImage)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { update, data: session } = useSession(options)

  const onFileChange = async (event: any) => {
    if (!session || !session.user) {
      return null
    }
    event.preventDefault()

    if (!inputFileRef.current?.files || !inputFileRef.current?.files[0]) {
      toast.info('Select a file first')
      return
    }

    // Make spinner visible
    setIsLoading(true)

    // Update avatar
    const file = inputFileRef.current.files[0]
    const response = await fetch(
      `/api/upload?filename=${file.name}&folder=avatar`,
      {
        method: 'POST',
        body: file,
      },
    )
    const newBlob = (await response.json()) as PutBlobResult

    // Update states
    setAvatar(null)
    setBlob(newBlob)

    // Update session
    session.user.image = newBlob.url
    update({
      picture: newBlob.url,
      banner: session.user.banner,
    })

    // Remove spinner
    setIsLoading(false)
  }

  const removeAvatar = async (event: any) => {
    if (!session || !session.user) {
      return null
    }
    if (!avatar && !blob) {
      toast.info('Nothing to remove')
      return
    }

    // Make spinner visible
    setIsLoading(true)

    // Delete the avatar
    const response = await fetch(
      `/api/upload?url=${avatar ?? blob?.url}&folder=avatar`,
      {
        method: 'DELETE',
      },
    )

    const answer = await response.json()
    log.info('Delete ', { answer })

    // Update states
    setAvatar(null)
    setBlob(null)

    // Update session
    session.user.image = null
    update({
      picture: session.user.image,
      banner: session.user.banner,
    })

    // Make spinner not visible
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <div className='w-[96px] text-center align-middle h-[80px]'>
          <Spinner />
        </div>
      ) : (
        <div className='text-xs max-w-[96px] flex flex-col gap-3'>
          <Image
            src={blob ? blob.url : avatar ?? ''}
            width={96}
            height={96}
            alt='Profile picture'
          />

          <form>
            <div className='flex flex-row gap-1'>
              <label htmlFor='file' className='text-xs btn btn-sm btn-primary'>
                <FiUploadCloud className='inline w-4 h-4' />
              </label>
              <label
                className='text-xs btn btn-outline btn-sm'
                onClick={removeAvatar}
              >
                <TiDocumentDelete className='w-4 h-4' />
              </label>
            </div>
            <input
              type='file'
              name='file'
              id='file'
              ref={inputFileRef}
              className='hidden'
              onChange={onFileChange}
            />
          </form>
        </div>
      )}
    </>
  )
}

export default Avatar
