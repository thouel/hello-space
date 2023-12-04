'use client'
import { PutBlobResult } from '@vercel/blob'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { FiUploadCloud } from 'react-icons/fi'
import { Spinner } from './Spinner'

const Avatar = ({ image }: { image: string | null | undefined }) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFileChange = async (event: any) => {
    event.preventDefault()

    if (!inputFileRef.current?.files || !inputFileRef.current?.files[0]) {
      toast.info('Select a file first')
      return
    }
    setIsLoading(true)
    const file = inputFileRef.current.files[0]
    const response = await fetch(
      `/api/upload?filename=${file.name}&folder=avatar`,
      {
        method: 'POST',
        body: file,
      },
    )
    const newBlob = (await response.json()) as PutBlobResult
    setBlob(newBlob)
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
            src={blob ? blob.url : image ?? ''}
            width={96}
            height={96}
            alt='Profile picture'
          />

          <form>
            <label
              htmlFor='file'
              className='w-full text-xs btn btn-sm btn-primary'
            >
              <FiUploadCloud className='inline w-4 h-4' />
              Avatar
            </label>
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
