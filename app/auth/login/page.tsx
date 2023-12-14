import { log } from '@logtail/next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import SignInProviders from '@/components/sub/SignInProviders'
import SignInError from '@/components/sub/SignInError'
import options from '@/app/api/auth/[...nextauth]/options'
import { getProviders } from 'next-auth/react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession(options)
  const callbackUrl = searchParams['callbackUrl']

  if (session) {
    if (callbackUrl && typeof callbackUrl === 'string') {
      redirect(`${callbackUrl}?fromLogin=1`)
    }
    redirect('/')
  }
  const providers = await getProviders()
  log.warn('providers rcvd', { providers })

  return (
    <>
      <p className='mb-2 text-center'>You choose the way you hop in</p>
      <div className='flex flex-col w-full gap-2 p-2 border border-gray-400 rounded-lg shadow-lg '>
        <SignInProviders providers={providers} />
      </div>
      <SignInError />
    </>
  )
}
