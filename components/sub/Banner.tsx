'use client'
import { PutBlobResult } from '@vercel/blob'
import { FiUploadCloud } from 'react-icons/fi'
import { TiDocumentDelete } from 'react-icons/ti'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { log } from '@logtail/next'
import { Spinner } from './Spinner'
import { useSession } from 'next-auth/react'
import options from '@/app/api/auth/[...nextauth]/options'

const Banner = ({
  banner: initialBanner,
}: {
  banner: string | null | undefined
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [banner, setBanner] = useState(initialBanner)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [isAreaVisible, setAreaVisible] = useState<boolean>(false)
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

    // Update banner
    const file = inputFileRef.current.files[0]
    const response = await fetch(
      `/api/upload?folder=banner&filename=${file.name}`,
      {
        method: 'POST',
        body: file,
      },
    )
    const newBlob = (await response.json()) as PutBlobResult

    // Update states
    setBanner(null)
    setBlob(newBlob)

    // Update session
    session.user = {
      ...session.user,
      banner: newBlob.url,
    }

    update({
      picture: session?.user.image,
      banner: newBlob.url,
    })

    // Make spinner not visible
    setIsLoading(false)
  }

  const removeBanner = async (event: any) => {
    if (!session || !session.user) {
      return null
    }
    if (!banner && !blob) {
      toast.info('Nothing to remove')
      return
    }

    // Make spinner visible
    setIsLoading(true)

    // Delete the banner
    const response = await fetch(
      `/api/upload?url=${banner ?? blob?.url}&folder=banner`,
      {
        method: 'DELETE',
      },
    )

    const answer = await response.json()
    log.info('Delete ', { answer })

    // Update states
    setBanner(null)
    setBlob(null)

    // Update session
    session.user = {
      ...session.user,
      banner: null,
    }
    update({
      picture: session?.user.image,
      banner: null,
    })

    // Make spinner not visible
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <div className='text-center align-middle h-[80px]'>
          <Spinner />
        </div>
      ) : (
        <div className='flex flex-col w-full gap-2 text-xs'>
          {blob ? (
            <Image src={blob.url} alt='Blob picture' width={375} height={96} />
          ) : null}
          {!blob && banner ? (
            <Image src={banner} alt='Banner picture' width={375} height={96} />
          ) : null}

          <div className='flex flex-row gap-1'>
            <p
              className='w-1/2 text-xs btn btn-primary btn-sm'
              onClick={() => setAreaVisible(!isAreaVisible)}
            >
              <FiUploadCloud className='inline w-4 h-4 mr-2' />
              Update Banner
            </p>
            <p
              className='w-1/2 text-xs btn btn-outline btn-sm'
              onClick={removeBanner}
            >
              <TiDocumentDelete className='w-4 h-4 mr-2' />
              Remove Banner
            </p>
          </div>
          {isAreaVisible === true ? (
            <div className='flex flex-col w-full p-2 text-sm text-center text-gray-600 border-4 border-gray-400 border-dashed rounded-lg dark:border-gray-200'>
              <form>
                <label htmlFor='banner' className='font-bold'>
                  <FiUploadCloud className='inline w-6 h-6 mr-2' />
                  Click to update your banner
                </label>
                <input
                  ref={inputFileRef}
                  type='file'
                  className='hidden'
                  name='banner'
                  id='banner'
                  onChange={onFileChange}
                />
              </form>
              <p className='text-xs'>Images only, 4.5 Mb max</p>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

export default Banner
