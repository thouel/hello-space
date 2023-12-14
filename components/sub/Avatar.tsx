'use client'
import { PutBlobResult } from '@vercel/blob'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { FiUploadCloud } from 'react-icons/fi'
import { Spinner } from './Spinner'
import { TiDocumentDelete } from 'react-icons/ti'
import { log } from '@logtail/next'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
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

const Avatar = ({
  image: initialImage,
}: {
  image: string | null | undefined
}) => {
  const { update, data: session } = useSession({ required: true })
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState(initialImage)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      type: 'avatar',
      picture: newBlob.url,
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
      type: 'avatar',
      picture: session.user.image,
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
            className='overflow-hidden rounded-lg'
          />

          <form>
            <div className='flex flex-row gap-1'>
              <Button asChild>
                <Label htmlFor='file' className=''>
                  <FiUploadCloud className='inline w-4 h-4' />
                </Label>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='destructive'
                    disabled={!avatar && !blob ? true : false}
                  >
                    <TiDocumentDelete className='w-4 h-4' />
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
                    <AlertDialogAction onClick={removeAvatar}>
                      Yes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
