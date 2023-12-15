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
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

const Banner = ({
  banner: initialBanner,
}: {
  banner: string | null | undefined
}) => {
  const { update, data: session } = useSession({ required: true })
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [banner, setBanner] = useState(initialBanner)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [isAreaVisible, setAreaVisible] = useState<boolean>(false)

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
      type: 'banner',
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
      type: 'banner',
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
        <div className='flex flex-col w-full gap-2 '>
          {blob ? (
            <Image
              src={blob.url}
              alt='Blob picture'
              width={375}
              height={96}
              className='overflow-hidden text-xs rounded-lg'
            />
          ) : null}
          {!blob && banner ? (
            <Image
              src={banner}
              alt='Banner picture'
              width={375}
              height={96}
              className='overflow-hidden text-xs rounded-lg'
            />
          ) : null}

          <div className='flex flex-row justify-between gap-1'>
            <Button
              className='text-xs grow'
              onClick={() => setAreaVisible(!isAreaVisible)}
            >
              <FiUploadCloud className='inline w-4 h-4 mr-2' />
              Update Banner
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='destructive'
                  disabled={!banner && !blob ? true : false}
                  className='text-xs'
                >
                  <TiDocumentDelete className='w-4 h-4 mr-2' />
                  Remove
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to remove this one from your
                    favourites?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    No worries ! You will be able to find it later.
                    <br />
                    Perhaps..
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction onClick={removeBanner}>
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          {isAreaVisible === true ? (
            <div className='flex flex-col w-full p-2 text-sm text-center text-gray-600 border-4 border-gray-400 border-dashed rounded-lg dark:border-gray-200 dark:text-gray-300'>
              <form>
                <label htmlFor='banner' className='font-semibold'>
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
